const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();
require('./db/config');
const PORT = process.env.PORT;
const booksRouter = require('./routers/booksRouter')
const borrowersRouter = require('./routers/borrowersRouter')
const borrowingRouter = require('./routers/borrowingRouter')
const userRouter = require('./routers/usersRouter')
const { authenticateToken } = require('./middleWares/authMiddleWare')
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


app.use('/books', authenticateToken, booksRouter)
app.use('/borrowers', authenticateToken, borrowersRouter)
app.use('/borrowings', authenticateToken, borrowingRouter)
app.use('/users', userRouter)

app.get('/', (req, res)=>{
    res.redirect('/users/login')
})

app.get('/home', authenticateToken, (req, res)=>{
    res.render('home', { username: req.user.userName })
})

app.use((err, req, res, next) => {
    console.log("The error status is:", err.status);
    console.log("The error message is:", err.message);
    res.status(err.status || 400).json({message: err.message, status: err.status || 'Internal Server Error'});
})

app.listen(PORT, ()=>{
    console.log(`localhost is running on port ${PORT}`);
});