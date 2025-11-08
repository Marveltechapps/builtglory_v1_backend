const SavedProperty = require('../models/SavedProperty');

// 🔍 Get saved property IDs for current user
exports.getSavedProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const saved = await SavedProperty.findOne({ userId });

        if (!saved) return res.status(200).json([]); // No saved properties yet

        res.status(200).json(saved.savedProperties); // Returns array of ObjectIds
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ➕ Save a property ID (prevent duplicates)
exports.saveProperty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;

        let saved = await SavedProperty.findOne({ userId });

        if (!saved) {
            saved = new SavedProperty({ userId, savedProperties: [propertyId] });
        } else if (!saved.savedProperties.includes(propertyId)) {
            saved.savedProperties.push(propertyId);
        }

        await saved.save();
        res.status(200).json({ message: 'Property saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ Remove a saved property ID
exports.removeSavedProperty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;

        const saved = await SavedProperty.findOne({ userId });

        if (!saved) return res.status(404).json({ error: 'No saved properties found for user' });

        saved.savedProperties = saved.savedProperties.filter(
            id => id.toString() !== propertyId
        );

        await saved.save();
        res.status(200).json({ message: 'Property removed from saved list' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
