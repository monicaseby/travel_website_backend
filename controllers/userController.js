const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json({ message: 'User already exists!' });
        }
        const newUser = new users({ username, email, password }); 
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully!', user: { _id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed!', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        if (password !== user.password) { 
            return res.status(401).json({ message: 'Invalid password!' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token, user: { _id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed!', error: error.message });
    }
};