const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    isAvliable: {type: Boolean, required: true}
})

module.exports = mongoose.model('Book', bookSchema);
