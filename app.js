const express = require('express');
const app = express();
const methodOverride = require('method-override');
require('dotenv').config();
require('./db/config');
const PORT = process.env.PORT;
const booksRouter = require('./routers/books/index')
const borrowersRouter = require('./routers/borrowers/index')
const borrowingRouter = require('./routers/borrowing/index')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));


app.use('/books', booksRouter)
app.use('/borrowers', borrowersRouter)
app.use('/borrowings', borrowingRouter)

app.get('/', (req, res)=>{
    res.render('home', { })
})

app.use((err, req, res, next) => {
    console.log("The error status is:", err.status);
    console.log("The error message is:", err.message);
    res.status(err.status || 400).json({message: err.message, status: err.status || 'Internal Server Error'});
})

app.listen(PORT, ()=>{
    console.log(`localhost is running on port ${PORT}`);
});