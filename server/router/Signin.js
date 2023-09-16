const express = require('express');
const mongoose = require('mongoose');

// Using for encrypt the password
const bcrypt = require('bcrypt');

// Use to create Token
const jwt = require('jsonwebtoken');

// Import the Model
const UserModel = require('../models/Users');

const router = express.Router();

// Check the email is exists or not, if not then check the password correctness if it correct then user is logged in
router.post("/", async (req, res) => {
    const user = req.body;
    const existUser = await UserModel.findOne({ email: user.email });

    // Email is exists or not
    if (!existUser) {
        return res.json({ message: "Wrong email address" });
    }

    // Compare hashed password with insert password
    const isValidPassword = await bcrypt.compare(user.password, existUser.password);

    // If its matched then return true and send the token , information and message to frontend
    if (!isValidPassword) {
        return res.json({ message: "Wrong password" });
    }

    // Generate the token
    const token = jwt.sign({ id: existUser._id }, "secret");
    return res.json({ token, data: existUser, message: "Successfully Logged in..." });
})

// Export the router
module.exports = router;