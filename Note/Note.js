// const express = require("express")
// const note = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    note: String,
    parentId: String,
})

module.export = mongoose.model('Note', noteSchema)