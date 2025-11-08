const Property = require('../models/Property');

// Fetch and filter properties
exports.fetchAndFilterProperties = async (req, res) => {
    try {
        const query = {};

        if (req.query.location) query.location = req.query.location;
        if (req.query.type) query.type = req.query.type;

        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
        }

        const properties = await Property.find(query);
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
