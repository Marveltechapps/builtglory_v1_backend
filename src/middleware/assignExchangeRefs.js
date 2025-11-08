const Sell = require('../models/Sell');
const Property = require('../models/Property');

/**
 * Middleware to assign sellerProperty and matchedProperties
 * Adds `req.exchangeData = { sellerProperty, matchedProperties }`
 */

const assignExchangeRefs = async (req, res, next) => {
    try {
        const { sellId } = req.body;

        if (!sellId) {
            return res.status(400).json({ error: 'Missing sellId in request body' });
        }

        const sellerProperty = await Sell.findById(sellId);
        if (!sellerProperty) {
            return res.status(404).json({ error: 'Sell property not found' });
        }

        const matchedProperties = await Property.find({
            price: { $gte: sellerProperty.price }
        });

        req.exchangeData = {
            sellerProperty: sellerProperty._id,
            matchedProperties: matchedProperties.map(p => p._id),
            fallbackToBuy: matchedProperties.length === 0
        };

        next();
    } catch (err) {
        console.error('Exchange middleware error:', err.message);
        res.status(500).json({ error: 'Failed to assign exchange references' });
    }
};

module.exports = assignExchangeRefs;
