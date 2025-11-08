const History = require('../models/History');

// 🔍 Get full history for current user
exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await History.findOne({ userId });
        if (!history) return res.status(200).json({ buyList: [], exchangeList: [] });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ➕ Add property to buyList
exports.addToBuyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;

        let history = await History.findOne({ userId });

        if (!history) {
            history = new History({ userId, buyList: [propertyId] });
        } else if (!history.buyList.includes(propertyId)) {
            history.buyList.push(propertyId);
        }

        await history.save();
        res.status(200).json({ message: 'Property added to buy history' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ➕ Add property to exchangeList
exports.addToExchangeList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { exchangeId } = req.body;

        let history = await History.findOne({ userId });

        if (!history) {
            history = new History({ userId, exchangeList: [exchangeId] });
        } else if (!history.exchangeList.includes(exchangeId)) {
            history.exchangeList.push(exchangeId);
        }

        await history.save();
        res.status(200).json({ message: 'Property added to exchange history' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ Remove property from buyList
exports.removeFromBuyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;

        const history = await History.findOne({ userId });
        if (!history) return res.status(404).json({ error: 'History not found' });

        history.buyList = history.buyList.filter(id => id.toString() !== propertyId);
        await history.save();

        res.status(200).json({ message: 'Property removed from buy history' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ Remove property from exchangeList
exports.removeFromExchangeList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { exchangeId } = req.body;

        const history = await History.findOne({ userId });
        if (!history) return res.status(404).json({ error: 'History not found' });

        history.exchangeList = history.exchangeList.filter(id => id.toString() !== exchangeId);
        await history.save();

        res.status(200).json({ message: 'Property removed from exchange history' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
