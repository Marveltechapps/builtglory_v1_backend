const Exchange = require('../models/Exchange');
const Sell = require('../models/Sell');
const Property = require('../models/Property');

// Create exchange entry and find matches
exports.createExchange = async (req, res) => {
    try {
        const { sellerProperty, matchedProperties, fallbackToBuy } = req.exchangeData;
        const userId = req.user.id;

        const exchange = new Exchange({
            userId,
            sellerProperty,
            matchedProperties,
            fallbackToBuy
        });

        await exchange.save();

        res.status(201).json({
            message: 'Exchange created',
            exchangeId: exchange._id,
            matchedCount: matchedProperties.length,
            fallbackToBuy,
            matchedProperties
        });
    } catch (err) {
        res.status(500).json({ error: 'Exchange creation failed', details: err.message });
    }
};

// 📥 Get All Exchanges
exports.getAllExchanges = async (req, res) => {
    try {
        const exchanges = await Exchange.find().populate('sellerProperty matchedProperties');
        res.status(200).json(exchanges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get exchange by ID
exports.getExchangeById = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await Exchange.findById(id)
            .populate('sellerProperty')
            .populate('matchedProperties');

        if (!exchange) return res.status(404).json({ error: 'Exchange not found' });

        res.status(200).json(exchange);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch exchange', details: err.message });
    }
};

// ✏️ Update Exchange
exports.updateExchange = async (req, res) => {
    try {
        const updated = await Exchange.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Delete exchange
exports.deleteExchange = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await Exchange.findByIdAndDelete(id);
        if (!exchange) return res.status(404).json({ error: 'Exchange not found' });

        res.status(200).json({ message: 'Exchange deleted', data: exchange });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete exchange', details: err.message });
    }
};
