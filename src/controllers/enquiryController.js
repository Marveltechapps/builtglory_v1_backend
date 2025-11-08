const Enquiry = require('../models/Enquiry');
const History = require('../models/History');

// ➕ Submit enquiry and update history
exports.submitEnquiry = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId, message, type } = req.body;

        if (!['Buy', 'Exchange'].includes(type)) {
            return res.status(400).json({ error: 'Invalid enquiry type' });
        }

        // Step 1: Check for existing enquiry
        const existingEnquiry = await Enquiry.findOne({ userId, propertyId, type });
        if (existingEnquiry) {
            return res.status(409).json({ error: 'Enquiry already submitted for this property and type' });
        }

        // Step 2: Save new enquiry
        const enquiry = new Enquiry({ userId, propertyId, message, type });
        await enquiry.save();

        // Step 3: Update history
        let history = await History.findOne({ userId });

        if (!history) {
            history = new History({ userId });
        }

        const listKey = type === 'Buy' ? 'buyList' : 'exchangeList';
        const alreadyInList = history[listKey].some(id => id.toString() === propertyId);

        if (!alreadyInList) {
            history[listKey].push(propertyId);
            await history.save();
        }

        res.status(201).json({ message: 'Enquiry submitted and history updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error while submitting enquiry' });
    }
};
