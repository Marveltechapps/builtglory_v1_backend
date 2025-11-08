const mongoose = require('mongoose');

const onboardingScreenSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    order: { type: Number, required: true, unique: true }, // Controls screen sequence
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('OnboardingScreen', onboardingScreenSchema);
