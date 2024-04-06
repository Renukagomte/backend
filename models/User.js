const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: '' // You can store image URLs here
    },
    isPublic: {
        type: Boolean,
        default: true // Indicates whether the profile is public or private
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);