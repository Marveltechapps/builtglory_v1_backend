const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = { id: decoded.userId, mobileNumber: decoded.mobileNumber };
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
