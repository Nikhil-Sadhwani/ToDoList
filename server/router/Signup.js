const express = require('express');
const mongoose = require('mongoose');

// Using for encrypt the password
const bcrypt = require('bcrypt');

// Import the Model
const UserModel = require('../models/Users');

const router = express.Router();

// Check the Email and Insert it into database
router.post("/", async (req, res) => {
    const user = req.body;
    const existUser = await UserModel.findOne({ email: user.email });

    // Check the email is exists or not
    if (existUser) {
        return res.json({ message: "User is already exists" });
    }

    // Convert the password into hashed form
    const hashPassword = await bcrypt.hash(user.password, 10);

    // Storing data
    const newUser = new UserModel({ username: user.username, email: user.email, password: hashPassword });
    await newUser.save();

    return res.json({ message: "Successfully registered" });
})

// Export the router
module.exports = router;