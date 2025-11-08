const Property = require('../models/Property');

// Get properties by type
exports.getPropertiesByType = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) return res.status(400).json({ error: 'Type is required' });

        const properties = await Property.find({ type });
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Multi-keyword search using POST body
exports.searchProperties = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: 'Search query is required' });

        const keywords = query.split(' ').map(word => new RegExp(word, 'i'));

        const properties = await Property.find({
            $and: keywords.map(regex => ({
                $or: [
                    { title: regex },
                    { type: regex },
                    { subtype: regex },
                    { about: regex },
                    { amenities: regex },
                    { 'location.country': regex },
                    { 'location.state': regex },
                    { 'location.district': regex },
                    { 'location.city': regex },
                    { 'location.locality': regex },
                    { 'location.pinCode': regex }
                ]
            }))
        });

        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
