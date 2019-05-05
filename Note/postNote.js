const { Notes } = require('../Models/NoteModel');
const express = require("express");
const router = express.Router();
const Joi = require("joi");

function validate(req) {
    const schema = {
        note: Joi.string().min(3).max(5000).required(),
    };
    return Joi.validate(req, schema);
}

router.post('/', async (req, res) => { 
    const { error } = validate(req.body);
    console.log(req.body.note)
    console.log(req.session.id)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const note = new Notes({
        author: req.session.id,
        note: req.body.note,
    });

    await note.save();
    res.status(200).send(note);
})

module.exports = router;