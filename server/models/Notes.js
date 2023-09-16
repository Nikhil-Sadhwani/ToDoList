const mongoose = require('mongoose');

// Schema for the Models
const NoteSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        require: true
    },
});

// Declare and Initialize Model
const NoteModel = mongoose.model("notes", NoteSchema);

//Export Model
module.exports = NoteModel;