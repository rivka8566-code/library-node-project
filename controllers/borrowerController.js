const Borrower = require('../models/borrowerModel');

exports.getAllBorrowedBooks = async (req, res, next) => {
    try {
        const borrowers = await Borrower.find().populate('borrowedBooks');
        res.render('showAllBorrowers', { borrowers });
    }
    catch (err) {
        const error = new Error("Error occurred in Show all borrowers " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.getBorrowerById = async (req, res, next) => {
    try {
        const borrower = await Borrower.findById(req.params.id).populate('borrowedBooks');
        res.render('borrowerDetails', { borrower });
    } catch (err) {
        const error = new Error("Error occurred in Show borrower by ID " + err.message);
        error.status = 500;
        return next(error);
    }
}

exports.addBorrowerForm = (req, res) => {
    res.render('addBorrower');
}

exports.addBorrower = async (req, res, next) => {
    try {
        const { name, phone, address } = req.body;
        const borrower = new Borrower({
            name: name,
            phone: phone,
            address: address,
            borrowedBooks: [],
            totalBorrowed: 0
        });
        await borrower.save();
        res.redirect('/borrowers');
    } catch (err) {
        const error = new Error("Error occurred in Add borrower " + err.message);
        error.status = 500;
        return next(error);
    }
}


