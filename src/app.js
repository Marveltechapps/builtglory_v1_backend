const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import Routes
const onboardingScreenRoutes = require('./routes/onboardingScreenRoutes');
const profileRoutes = require('./routes/profileRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const sellRoutes = require('./routes/sellRoutes');
const buyHomepageRoutes = require('./routes/buyHomepageRoutes');
const exploreRoutes = require('./routes/exploreRoutes');
const savedPropertyRoutes = require('./routes/savedPropertyRoutes');
const generalInfoRoutes = require('./routes/generalInfoRoutes');
const userRoutes = require('./routes/userRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const userImageRoutes = require('./routes/userImageRoutes');
const historyRoutes = require('./routes/historyRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/onboarding', onboardingScreenRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/sells', sellRoutes);
app.use('/api/homepage', buyHomepageRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/saved', savedPropertyRoutes);
app.use('/api/generalinfo', generalInfoRoutes);
app.use('/api/signin', userRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/user', userImageRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
