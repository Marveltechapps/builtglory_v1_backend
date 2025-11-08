const GeneralInfo = require('../models/generalInfo');

// Create info block
exports.createInfo = async (req, res) => {
    try {
        const info = new GeneralInfo(req.body);
        await info.save();
        res.status(201).json(info);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch all info blocks
exports.fetchAllInfo = async (req, res) => {
    try {
        const data = await GeneralInfo.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update info block
exports.updateInfo = async (req, res) => {
    try {
        const info = await GeneralInfo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json(info);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete info block
exports.deleteInfo = async (req, res) => {
    try {
        await GeneralInfo.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
