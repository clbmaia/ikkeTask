const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: String,
    cpf: String,
    email: String,
    account: String,
    status: String,
    userId: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);