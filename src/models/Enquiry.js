const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    // 🔐 User who initiated the enquiry
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // 🏠 Property involved in the enquiry
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },

    // 💬 Optional message or inquiry
    message: {
        type: String,
        trim: true
    },

    // 🔁 Type of enquiry
    type: {
        type: String,
        enum: ['Buy', 'Exchange'],
        required: true
    },

    // 🕒 Timestamp of the enquiry
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// ✅ Optional: enforce uniqueness per user-property-type
enquirySchema.index({ userId: 1, propertyId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
