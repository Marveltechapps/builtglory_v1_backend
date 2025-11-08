const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sellSchema = new mongoose.Schema({
    listingId: { type: String, default: uuidv4 },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 🔐 User reference

    // 🏷️ Advertisement Type
    advertisementType: {
        type: String,
        enum: ['Sale', 'Rent/Lease'],
        required: true
    },

    // 🏠 Property Type
    propertyType: {
        type: String,
        enum: ['Apartment', 'Independent House', 'Villa', 'Plot/Land'],
        required: true
    },

    // 🛏️ Configuration
    bhkType: { type: String, required: true }, // e.g., '2 BHK'
    builtUpArea: { type: Number, required: true },
    carpetArea: { type: Number },

    // 📍 Location Details
    location: {
        city: { type: String, required: true },
        locality: { type: String, required: true },
        projectName: { type: String }
    },

    // 💰 Pricing
    price: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },

    // 🧱 Additional Details
    ageOfConstruction: { type: String }, // e.g., '0-5 years'
    facing: { type: String }, // e.g., 'East', 'North-East'
    ownership: { type: String }, // e.g., 'Freehold', 'Leasehold'
    furnishedStatus: { type: String }, // e.g., 'Fully Furnished'

    // 🧩 Amenities
    amenities: [{ type: String }], // e.g., ['Gym', 'Pool', 'Lift']

    // 📝 Description
    description: { type: String },

    // 🖼️ Photos
    imageURLs: [{ type: String }], // multiple images

    // 📍 Map Link
    locationMapLink: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sell', sellSchema);
