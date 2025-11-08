const Notification = require('../models/Notification');

// ➕ Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const userId = req.user.id;
        const { category, eventCode, message, propertyId } = req.body;

        const notification = new Notification({
            userId,
            category,
            eventCode,
            message,
            propertyId
        });

        await notification.save();
        res.status(201).json({ message: 'Notification created', data: notification });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create notification', details: err.message });
    }
};

// 🔍 Get all notifications for current user
exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications', details: err.message });
    }
};

// ✅ Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const updated = await Notification.findOneAndUpdate(
            { _id: id, userId },
            { isRead: true },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Notification not found' });

        res.status(200).json({ message: 'Notification marked as read', data: updated });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update notification', details: err.message });
    }
};

// ❌ Delete notification
exports.deleteNotification = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deleted = await Notification.findOneAndDelete({ _id: id, userId });
        if (!deleted) return res.status(404).json({ error: 'Notification not found' });

        res.status(200).json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete notification', details: err.message });
    }
};
