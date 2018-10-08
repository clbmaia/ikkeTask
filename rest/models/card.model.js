const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name: String,
    cardNumber: String,
    type: String,
    expiration: String,
    limit: String,
    status: String,
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Card', CardSchema);