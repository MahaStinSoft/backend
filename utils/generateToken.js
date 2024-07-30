// utils/generateToken.js

const jwt = require('jsonwebtoken');

const generateToken = (res, userID) => {
    // Ensure userID is wrapped in an object
    const payload = { id: userID };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    });

    // Set the token in a cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        // sameSite: 'strict',
        maxAge: 86400000, // 1 day
    });

    return token; // Return the token if you want to use it in the response
};

module.exports = generateToken;
