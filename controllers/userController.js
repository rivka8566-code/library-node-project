const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.user.userName });
        res.render('showUserDetails', { user: user });
    }
    catch (err) {
        const error = new Error("Error occurred in Show all users " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.loginForm = async (req, res, next) => {
    res.render('login');
}

exports.loginUser = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {
        return res.render('error', { 
            message: 'שם משתמש לא קיים במערכת',
            backLink: '/users/login',
            backText: 'חזור להתחברות'
        });
    } 
    try{
        if(!await bcrypt.compare(req.body.password, user.password))
            return res.render('error', { 
                message: 'סיסמה שגויה',
                backLink: '/users/login',
                backText: 'חזור להתחברות'
            });
        const accessToken = jwt.sign({userId: user._id, userName: user.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', accessToken, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/home');
    }
    catch (err) {
        const error = new Error("Error occurred in Login user " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.registerForm = async (req, res, next) => {
    res.render('register');
}

exports.registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.render('error', { 
                message: 'שם המשתמש כבר קיים במערכת',
                backLink: '/users/register',
                backText: 'חזור להרשמה'
            });
        } else {
            const newUser = new User({ username: req.body.username, password: hashedPassword });
            await newUser.save();
            const accessToken = jwt.sign({userId: newUser._id, userName: newUser.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.cookie('token', accessToken, { httpOnly: true, maxAge: 3600000 });
            res.redirect('/home');
        }
    } catch (err) {
        const error = new Error("Error occurred in Register user " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/login');
}
