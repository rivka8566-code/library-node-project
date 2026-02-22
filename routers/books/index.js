const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/bookController')
const Book = require('../../models/bookModel')

const isBookExist = (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            if (book) {
                next();
            } else {
                res.send(`The book ${req.params.id} was not found`);
            }
        })
        .catch(err => {
            const error = new Error("Error occurred in finding book" + err.message);
            error.status = 500;
            return next(error);
        });
}

router.get('/', bookController.getAllBooks)

router.get('/add', bookController.addForm)

router.post('/add', bookController.addBook)

router.get('/update/:id', isBookExist, bookController.updateForm)

router.get('/:id', isBookExist, bookController.getBookById)

router.put('/update/:id', isBookExist, bookController.updateBook)

router.delete('/delete/:id', isBookExist, bookController.deleteBook)


module.exports = router