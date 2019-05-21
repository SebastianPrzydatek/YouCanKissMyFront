const { Notes } = require('../Models/NoteModel');
const express = require("express");
const router = express.Router();

router.get('/my', async (req, res) => {
    let myNotes = await Notes.find({ author: req.session.id })
    res.send(myNotes)
})

router.get('/:id', async (req, res) => {
    let note = await Notes.findById(req.params.id)
    res.send(note.note)
})

router.get('/', async (req, res) => {
    let notes = await Notes
    .find()
    res.send(notes)
})

module.exports = router;