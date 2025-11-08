const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // 🔐 Target user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 🧭 Notification category
    category: {
        type: String,
        enum: ['Buy', 'Sell', 'Exchange', 'System'],
        required: true
    },

    // 🧩 Event code for logic mapping
    eventCode: {
        type: String,
        enum: [
            // 🛒 BuyList
            'BUY_CREATED',
            'BUY_MATCHED',
            'BUY_COMPLETED',
            'BUY_REJECTED',
            'BUY_PRICE_UPDATED',

            // 🏷️ SellList
            'SELL_CREATED',
            'SELL_INTEREST',
            'SELL_CLOSED',

            // 🔁 ExchangeList
            'EXCHANGE_PROPOSED',
            'EXCHANGE_MATCHED',
            'EXCHANGE_COMPLETED',
            'EXCHANGE_FAILED',

            // ⚙️ System
            'SYSTEM_POLICY_UPDATE',
            'SYSTEM_APP_UPDATE'
        ],
        required: true
    },

    // 🏠 Optional property or asset reference
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },

    // 💬 Notification message
    message: {
        type: String,
        required: true,
        trim: true
    },

    // 🕒 Timestamp
    timestamp: {
        type: Date,
        default: Date.now
    },

    // ✅ Read status
    isRead: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
