const OnboardingScreen = require('../models/OnboardingScreen');

// Create new screen
exports.createScreen = async (req, res) => {
    const screen = new OnboardingScreen(req.body);
    await screen.save();
    res.status(201).json(screen);
};

// Get all screens
exports.getAllScreens = async (req, res) => {
    const screens = await OnboardingScreen.find({ isActive: true }).sort({ order: 1 });
    res.json(screens);
};

// Get screen by ID
exports.getScreenById = async (req, res) => {
    const screen = await OnboardingScreen.findById(req.params.id);
    if (!screen) return res.status(404).json({ error: 'Screen not found' });
    res.json(screen);
};

// Update screen by ID
exports.updateScreenById = async (req, res) => {
    const screen = await OnboardingScreen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!screen) return res.status(404).json({ error: 'Screen not found' });
    res.json(screen);
};

// Delete screen by ID
exports.deleteScreenById = async (req, res) => {
    const screen = await OnboardingScreen.findByIdAndDelete(req.params.id);
    if (!screen) return res.status(404).json({ error: 'Screen not found' });
    res.json({ message: 'Screen deleted' });
};
