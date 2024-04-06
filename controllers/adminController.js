const User = require('../models/User');

// Get all user profiles (public and private)
exports.getAllProfiles = async (req, res) => {
    try {
        // Check if the user making the request is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized: Only admin users can access this endpoint' });
        }

        // Find all user profiles
        const allProfiles = await User.find();

        // Return the list of all profiles
        res.status(200).json(allProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};