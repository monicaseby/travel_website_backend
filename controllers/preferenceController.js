// controllers/preferenceController.js

const Preference = require('../models/Preference'); 

const savePreference = async (req, res) => {
    try {
        const { destination, duration, budget, companion, userId } = req.body;

        const newPreference = new Preference({
            userId,
            destination,
            duration,
            budget,
            companion,
        });

        const savedPreference = await newPreference.save();

        console.log('Preferences saved:', savedPreference);
        res.status(201).json({ message: 'Preferences saved successfully', preference: savedPreference }); // Send back the saved preference
    } catch (error) {
        console.error('Error saving preference:', error);
        res.status(500).json({ message: 'Failed to save preferences', error: error.message });
    }
};

module.exports = {
    savePreference,
};