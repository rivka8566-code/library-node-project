const borrowedBooks = require('../models/borrowerModel');

exports.getAllBorrowedBooks = async (req, res, next) => {
    try {
        const borrowedBooks = await borrowedBooks.find();
        res.render('borrowers', { borrowedBooks })
    }
    catch (err) {
        const error = new Error("Error occurred in Show all borrowers " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.getBorrowerById = async (req, res, next) => {
    try {
        const borrower = await borrowedBooks.findById(req.params.id);
        res.render('borrower', { borrower });
    } catch (err) {
            const error = new Error("Error occurred in Show borrower by ID " + err.message);
            error.status = 500;
            return next(error);
        }
}

exports.addBorrower = async (req, res, next) => {
    try {
        const { name, date, borrowedBooks } = req.body;
        const borrower = new borrowedBooks({
            name: name,
            date: date,
            borrowedBooks: borrowedBooks
        })
        await borrower.save();
        res.redirect('/books');
    } catch (err) {
        const error = new Error("Error occurred in Add borrower " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.updateBorrower = async (req, res, next) => {
    try {
        const borrower = await borrowedBooks.findById(req.params.id);
        borrower.title = req.body.title;
        borrower.author = req.body.author;
        borrower.imageUrl = req.body.imageUrl;
        borrower.isAvliable = req.body.isAvliable;
        await borrower.save();
        res.redirect('/borrowers');
    } catch (err) {
        const error = new Error("Error occurred in Update borrower " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.deleteborrower = async (req, res, next) => {
    try {
        await borrowedBooks.deleteOne({ _id: req.params.id });
        res.redirect('/borrowers');
    } catch (err) {
        const error = new Error("Error occurred in Delete borrower " + err.message);
        error.status = 500;
        return next(error);
    }
}

