const express = require('express');
const mongoose = require('mongoose');

// Import Model
const NoteModel = require('../models/Notes');

const router = express.Router();

// Fetching data of particular user
router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const userNotes = await NoteModel.find({ email: email });

    if (userNotes.length == 0) {
        return res.json({ message: "No Notes Add Yet" });
    }

    return res.json({ data: userNotes, message: "Notes" });

});

// Inserting Task
router.post("/", async (req, res) => {
    const user = req.body;
    const newNote = new NoteModel({ email: user.email, title: user.title, description: user.description, complete: false });
    await newNote.save();

    res.json({ data: newNote, message: "Task is Inserted" });
});

// Updating the task by set the value true of complete 
router.put("/", async (req, res) => {
    const user = req.body;
    NoteModel.findByIdAndUpdate({ _id: user.id }, {
        $set: {
            complete: true
        },
    }).then((result) =>
        res.json({ data: result, message: "Task is Completed" })

    ).catch((err) => res.json(err));
});

// Deleting the task
router.delete("/del/:id", async (req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id).exec();
    res.json({ message: "Task is Deleted" });
});

// Export the router
module.exports = router;
