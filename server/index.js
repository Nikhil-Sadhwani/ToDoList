const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routers
const Signin = require('./router/Signin');
const Signup = require('./router/Signup');
const Notes = require('./router/Notes');

// Access the .env files
require('dotenv').config();

const app = express();

// For connecting to different ports
app.use(cors());

// It is used for post request
app.use(express.json());

// These are the routers
app.use("/login", Signin);
app.use("/signup", Signup);
app.use("/notes", Notes);

// Connect to database . Add the mongoDB URL 
mongoose.connect(process.env.MONGODB_URL);

// Listining
app.listen(3004, () => {
    console.log("Server is running");
})


