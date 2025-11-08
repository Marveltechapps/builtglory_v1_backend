const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'Commercial', 'Plot', 'OrganicHome'],
        required: true
    },
    subtype: {
        type: String,
        enum: ['Retail', 'Mixed-Use', 'Office', 'Land', 'Residential', 'Agricultural', 'Commercial'],
        required: function () {
            return ['Commercial', 'Plot'].includes(this.type);
        }
    },
    location: {
        country: {
            type: String,
            required: true,
            default: 'India'
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true,
            match: /^[0-9]{6}$/ // Validates 6-digit pincode
        },
        fullAddress: {
            type: String,
            required: true
        }
    },
    mapCoordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    price: { type: Number, required: true },
    image: { type: String },
    sqft: { type: Number },
    about: { type: String },
    amenities: [{ type: String }],

    layout: {
        bedrooms: {
            type: Number,
            required: function () {
                return ['Apartment', 'Villa', 'OrganicHome'].includes(this.type);
            }
        },
        bathrooms: {
            type: Number,
            required: function () {
                return ['Apartment', 'Villa', 'OrganicHome'].includes(this.type);
            }
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
