const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all user profiles (public and private)
router.get('/profiles', adminController.getAllProfiles);

module.exports = router;