const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get current user's profile details
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch the user's profile details from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user's profile details
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllProfile = async (req, res) => {
    try {
        const publicProfiles = await User.find({ isPublic: true });

        // Return the list of public profiles
        res.status(200).json(publicProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Edit user details
exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authenticated user ID is set in req.user.id

        // Retrieve updated profile details from request body
        const { name, email, password, bio, phone, photo, isPublic } = req.body;

        // Find the user by ID
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's profile fields
        user.name = name;
        user.email = email;
        user.bio = bio;
        user.phone = phone;
        user.photo = photo;
        user.isPublic = isPublic;

        // If the password is provided, hash and update it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user profile
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Upload new photo or provide image URL
exports.uploadPhoto = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authenticated user ID is set in req.user.id

        // Retrieve photo URL from request body
        const { photo } = req.body;

        // Find the user by ID
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's photo field
        user.photo = photo;

        // Save the updated user profile
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Photo updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Set profile as public or private
exports.setProfileVisibility = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authenticated user ID is set in req.user.id

        // Retrieve visibility status from request body
        const { isPublic } = req.body;

        // Find the user by ID
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's visibility status
        user.isPublic = isPublic;

        // Save the updated user profile
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Profile visibility updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getPublicProfiles = async (req, res) => {
    try {
        // Find all user profiles with isPublic set to true
        const publicProfiles = await User.find({ isPublic: true });

        // Return the list of public profiles
        res.status(200).json(publicProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};