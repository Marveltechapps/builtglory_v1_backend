const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const User = require('../models/User');
require('dotenv').config();

// Configure AWS SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.uploadProfileImage = async (req, res) => {
    const mobileNumber = req.user.mobileNumber;

    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }

    const fileName = `profile-images/${Date.now()}-${req.file.originalname}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(params));

        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const user = await User.findOneAndUpdate(
            { mobileNumber },
            { profileImage: imageUrl },
            { new: true }
        );

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            message: 'Profile image updated',
            profileImage: user.profileImage
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload image', details: err.message });
    }
};
