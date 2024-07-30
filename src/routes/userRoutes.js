const express = require('express');
const { createUser, login, getProfile, updateProfile, logout } = require('../controller/userController');

const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/logout', logout);

module.exports = router;