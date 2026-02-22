const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    isAvailable: {type: Boolean, required: true},
    description: {type: String, required: true},
    isPartOfSeries: {type: Boolean, required: true},
})

module.exports = mongoose.model('Book', bookSchema);
