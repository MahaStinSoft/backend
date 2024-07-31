// // routes/authRoutes.js

// const express = require('express');
// const router = express.Router();
// const { login } = require('../controllers/authController'); // Ensure the correct path

// // Login route
// router.post('/login', login);

// module.exports = router;



const express = require('express');
const { login, signup, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

module.exports = router;
