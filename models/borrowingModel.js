const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    borrower: { type: mongoose.Schema.Types.ObjectId,
            ref: 'Borrower',
            required: true },
    book: { type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true },
    borrowDate: { type: Date },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Borrowing', borrowingSchema);
