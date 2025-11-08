const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Sell = require('../models/Sell');
const History = require('../models/History');
require('dotenv').config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.createSell = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: Missing user context' });
        }

        const userId = req.user.id;
        let imageURLs = [];

        // Upload images to S3
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileName = `property-images/${Date.now()}-${file.originalname}`;
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: fileName,
                    Body: file.buffer,
                    ContentType: file.mimetype
                };

                await s3.send(new PutObjectCommand(params));

                const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
                imageURLs.push(imageUrl);
            }
        }

        // Create Sell listing
        const sell = new Sell({
            ...req.body,
            imageURLs,
            userId
        });

        await sell.save();

        // Update History
        let history = await History.findOne({ userId });

        if (!history) {
            history = new History({ userId, sellList: [sell._id] });
        } else {
            const alreadyExists = history.sellList.some(id => id.toString() === sell._id.toString());
            if (!alreadyExists) {
                history.sellList.push(sell._id);
            }
        }

        await history.save();

        res.status(201).json(sell);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create listing', details: err.message });
    }
};


// Get All
exports.getAllSells = async (req, res) => {
    try {
        const sells = await Sell.find();
        res.status(200).json(sells);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get by ID
exports.getSellById = async (req, res) => {
    try {
        const sell = await Sell.findById(req.params.id);
        if (!sell) return res.status(404).json({ error: 'Sell listing not found' });
        res.status(200).json(sell);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updateSell = async (req, res) => {
    try {
        const updated = await Sell.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
exports.deleteSell = async (req, res) => {
    try {
        await Sell.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
