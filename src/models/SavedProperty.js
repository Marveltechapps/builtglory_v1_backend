const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // 🔐 User-specific reference
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // one profile per user
    },

    // 🏠 Saved properties (wishlist, tracking)
    savedProperties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
});

module.exports = mongoose.model('SavedProperty', profileSchema);
