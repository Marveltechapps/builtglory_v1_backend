const User = require('../models/User');

// 🔍 Get user by mobile number
exports.getUserByMobile = async (req, res) => {
    const mobileNumber = req.user.mobileNumber;

    try {
        const user = await User.findOne({ mobileNumber });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
};

// 🔄 Update user profile (name, email, profileImage)
exports.updateUser = async (req, res) => {
    const mobileNumber = req.user.mobileNumber;
    const { name, email } = req.body;

    try {
        const updated = await User.findOneAndUpdate(
            { mobileNumber },
            { ...(name && { name }), ...(email && { email }) },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
};

// ❌ Delete user by mobile number
exports.deleteUser = async (req, res) => {
    const mobileNumber = req.user.mobileNumber;

    try {
        const deleted = await User.findOneAndDelete({ mobileNumber });
        if (!deleted) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully', data: deleted });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
};
