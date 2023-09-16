const mongoose = require('mongoose');

// Schema for the Models
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
});

// Declare and Initialize Model
const UserModel = mongoose.model("users", UserSchema);

//Export Model
module.exports = UserModel;