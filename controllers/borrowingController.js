const Borrowing = require('../models/borrowingModel');
const Borrower = require('../models/borrowerModel');
const Book = require('../models/bookModel');

exports.getAllBorrowedBooks = async (req, res, next) => {
    try {
        const borrowings = await Borrowing.find().populate('borrower').populate('book').sort({ borrowDate: -1 });
        const validBorrowings = borrowings.filter(b => b.book && b.borrower);
        res.render('showAllBorrowing', { borrowings: validBorrowings });
    }
    catch (err) {
        const error = new Error("Error occurred in Show all borrowings " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.addBorrowingForm = async (req, res, next) => {
    try {
        const book = await Book.findById(req.query.bookId);
        const borrowers = await Borrower.find();
        res.render('addBorrowing', { book, borrowers });
    }
    catch (err) {
        const error = new Error("Error occurred in Add borrowing form " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.addBorrowing = async (req, res, next) => {
    try {
        const borrowing = new Borrowing({
            borrower: req.body.userId,
            book: req.body.bookId,
            borrowDate: new Date()
        });
        await borrowing.save();
        const book = await Book.findById(req.body.bookId);
        book.isAvailable = false;
        await book.save();
        const borrower = await Borrower.findById(req.body.userId);
        borrower.borrowedBooks.push(req.body.bookId);
        borrower.totalBorrowed += 1;
        await borrower.save();
        res.redirect('/books');
    }
    catch (err) {
        const error = new Error("Error occurred in Add borrowing " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.returnBorrowing = async (req, res, next) => {
    try {
        const borrowing = await Borrowing.findById(req.params.id);
        borrowing.returnDate = new Date();
        await borrowing.save();
        const borrower = await Borrower.findById(borrowing.borrower);
        borrower.borrowedBooks.pull(borrowing.book);
        await borrower.save();
        const book = await Book.findById(borrowing.book);
        book.isAvailable = true;
        await book.save();
        res.redirect('/borrowings');
    } catch (err) {
        const error = new Error("Error occurred in Return borrowing " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.returnBorrowingByBook = async (req, res, next) => {
    try {
        const borrowing = await Borrowing.findOne({
            book: req.query.bookId,
            borrower: req.query.borrowerId,
            returnDate: null
        });
        if (borrowing) {
            borrowing.returnDate = new Date();
            await borrowing.save();
            const book = await Book.findById(req.query.bookId);
            book.isAvailable = true;
            await book.save();
            const borrower = await Borrower.findById(req.query.borrowerId);
            borrower.borrowedBooks.pull(req.query.bookId);
            await borrower.save();
        }
        res.redirect(`/borrowers/${req.query.borrowerId}`);
    } catch (err) {
        const error = new Error("Error occurred in Return borrowing by book " + err.message);
        error.status = 500;
        return next(error);
    }
}
