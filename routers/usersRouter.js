const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middleWares/authMiddleWare');

router.get('/', authenticateToken, userController.getAllUsers)

router.get('/login', userController.loginForm)
router.post('/login', userController.loginUser)

router.get('/register', userController.registerForm)
router.post('/register', userController.registerUser)

router.get('/logout', userController.logoutUser)

module.exports = router