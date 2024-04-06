const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new account
router.post('/register', authController.register);

// Log in
router.post('/login', authController.login);

// Log out
router.post('/logout', authController.logout);

// Log in with external service
router.post('/continueWithGoogle', authController.continueWithGoogle);

module.exports = router;