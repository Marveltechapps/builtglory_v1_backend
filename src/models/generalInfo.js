const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
    section: { type: String, required: true }, // e.g., 'Construction', 'Emergency Contacts'
    content: { type: String, required: true }, // Rich text or markdown
    updatedBy: { type: String },               // Admin or system user
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GeneralInfo', generalInfoSchema);

