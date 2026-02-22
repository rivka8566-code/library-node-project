const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    totalBorrowed: {type: Number, default: 0}
});

module.exports = mongoose.model('Borrower', borrowerSchema);
