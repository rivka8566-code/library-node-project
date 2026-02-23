const express = require('express');
const router = express.Router();
const borrowingController = require('../../controllers/borrowingController')

router.get('/', borrowingController.getAllBorrowedBooks)

router.get('/add', borrowingController.addBorrowingForm)

router.post('/add', borrowingController.addBorrowing)

router.post('/return/:id', borrowingController.returnBorrowing)

router.post('/returnByBook', borrowingController.returnBorrowingByBook)

module.exports = router