const mongoose = require('mongoose');

const lenderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    
})

module.exports = mongoose.model('Lender', lenderSchema);
