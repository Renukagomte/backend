const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get current user's profile details
router.get('/get-profile', profileController.getAllProfile);
router.get('/user-profile', profileController.getUserProfile);
router.get('/profiles/public', profileController.getPublicProfiles);

// Edit user details
router.put('/update', profileController.editProfile);

// Upload new photo or provide image URL
router.post('/photo', profileController.uploadPhoto);

// Set profile as public or private
router.put('/visibility', profileController.setProfileVisibility);

module.exports = router;