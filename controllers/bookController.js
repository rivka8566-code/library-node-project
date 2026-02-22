const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.render('books', { books })
    }
    catch (err) {
        const error = new Error("Error occurred in Show all books " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('book', { book });
    } catch (err) {
            const error = new Error("Error occurred in Show book by ID " + err.message);
            error.status = 500;
            return next(error);
        }
}

exports.addBook = async (req, res, next) => {
    try {
        const { title, author, imageUrl, isAvliable } = req.body;
        const book = new Book({
            title: title,
            author: author,
            imageUrl: imageUrl,
            isAvliable: isAvliable
        })
        await book.save();
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Add book " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.imageUrl = req.body.imageUrl;
        book.isAvliable = req.body.isAvliable;
        await book.save();
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Update book " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Delete book " + err.message);
        error.status = 500;
        return next(error);
    }
}

