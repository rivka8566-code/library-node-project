const mongoose = require('mongoose');
const Book = require('./bookModel')

const lenderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    borrowedBooks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
})

module.exports = mongoose.model('Lender', lenderSchema);
