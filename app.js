const express = require('express');
require("dotenv").config({ path: ".env" })
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require("cors")
const { connectDB } = require("./config/db")


connectDB()

// Middleware
const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
mongoose.connection.once("open", () => {
    console.log("DB CONNECTED");
})
mongoose.connection.on("error", err => {
    console.log("DB CONNECTION ERROR", err)
})

app.listen(process.env.PORT || 5000, err => {
    if (err) {
        return console.log("UNABLE TO START SERVER", err);
    }
    console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT || 5000}`);
})