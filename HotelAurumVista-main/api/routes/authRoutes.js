const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginUser);

module.exports = router;