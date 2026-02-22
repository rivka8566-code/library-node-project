const express = require('express');
const router = express.Router();
const borrowerController = require('../../controllers/borrowerController')
const Borrower = require('../../models/borrowerModel')

const isborrowerExist = (req, res, next) => {
    Borrower.findById(req.params.id)
        .then(borrower => {
            if (borrower) {
                next();
            } else {
                res.send(`The borrower ${req.params.id} was not found`);
            }
        })
        .catch(err => {
            const error = new Error("Error occurred in finding borrower" + err.message);
            error.status = 500;
            return next(error);
        });
}

router.get('/', borrowerController.getAllBorrowedBooks)

router.get('/:id', isborrowerExist, borrowerController.getBorrowerById)

router.post('/add', borrowerController.addBorrower)

router.put('/update/:id', isborrowerExist, borrowerController.updateBorrower)

router.delete('/delete/:id', isborrowerExist, borrowerController.deleteborrower)


module.exports = router