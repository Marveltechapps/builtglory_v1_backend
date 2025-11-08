const multer = require('multer');
const path = require('path');

// Store file in memory for direct upload
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!file.mimetype.startsWith('image/') || !['.jpg', '.jpeg', '.png'].includes(ext)) {
            return cb(new Error('Only JPG, JPEG, PNG images are allowed'));
        }
        cb(null, true);
    }
});

module.exports = upload;
