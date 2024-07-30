const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists. Please use a different email');
    }

    const user = new User({
        name,
        email,
        password,
    });

    const createdUser = await user.save();

    generateToken(res, createdUser._id);

    res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both email and password');
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 0, // Clear the cookie
    });

    res.status(200).send('User logged out');
});

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

const updateProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    });
});

module.exports = { createUser, login, logout, getProfile, updateProfile };
