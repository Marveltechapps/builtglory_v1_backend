const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerProperty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sell',
        required: true
    },
    matchedProperties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    fallbackToBuy: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exchange', exchangeSchema);
