const Feedback = require('../models/Feedback');

// ➕ Submit feedback
exports.submitFeedback = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, email, subject, message } = req.body;

        const feedback = new Feedback({ userId, fullName, email, subject, message });
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit feedback', details: err.message });
    }
};

// 🔍 Get all feedback by current user
exports.getUserFeedback = async (req, res) => {
    try {
        const userId = req.user.id;
        const feedbacks = await Feedback.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch feedback', details: err.message });
    }
};

// 📝 Update feedback message and subject
exports.updateFeedback = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { subject, message } = req.body;

        const updated = await Feedback.findOneAndUpdate(
            { _id: id, userId },
            { subject, message },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Feedback not found' });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update feedback', details: err.message });
    }
};

// ❌ Delete feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deleted = await Feedback.findOneAndDelete({ _id: id, userId });
        if (!deleted) return res.status(404).json({ error: 'Feedback not found' });

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete feedback', details: err.message });
    }
};
