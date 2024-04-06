const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library")

// Register a new account
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // Return success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Log in
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists
        const user = await User.findOne({ email });
        console.log("user", user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("isPasswordValid", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        console.log("token", token);
        // Return the token
        res.json({ token });
    } catch (error) {
        console.error("@@@@", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Log out
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Log in with external service
exports.continueWithGoogle = async (req, res) => {
    try {
        if (!req.body.tokenId) {
            return res.status(400).json({
                message: "Please Provide Token"
            })
        }

        const gc = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { payload: { email, name, picture } } = await gc.verifyIdToken({ idToken: req.body.tokenId })

        const result = await User.findOne({ email })

        if (result) {
            const token = jwt.sign({ userId: result._id, name, email }, process.env.JWT_KEY)
            res.cookie("token", token)

            res.json({
                message: "Login success",
                result: {
                    name, email
                }
            })

        } else {
            const result = await User.create({
                name,
                email,
                photo: picture
            })

            const token = jwt.sign({ name, email}, process.env.JWT_KEY)
            res.cookie("token", token)

            res.json({
                message: "Register success",
                result: {
                    name, email
                }
            })
        }

    } catch (error) {
        console.log("UserController.js => destroyUser");
        console.log(error);
        res.status(400).json({
            message: "Error" + error
        })
    }
}