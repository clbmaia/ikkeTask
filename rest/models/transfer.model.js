const mongoose = require('mongoose');

const TransferSchema = mongoose.Schema({
    contactId: String,
    reason: String,
    contact: String,    
    valueTransfer: String,
    dateTransfer: String,
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transfer', TransferSchema);