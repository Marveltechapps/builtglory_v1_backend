const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    // 🔐 User-specific reference
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // 🛒 Buy history list (Property IDs)
    buyList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],

    // 🔄 Exchange history list (Exchange IDs)
    exchangeList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange'
    }],

    // 🏷️ Sell history list (Sell IDs)
    sellList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sell'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);
