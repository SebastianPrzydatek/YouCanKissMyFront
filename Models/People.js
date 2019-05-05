const express = require("express");
const Schema = mongoose.Schema;

const people = mongoose.model('people', new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    first_name: String,
    second_name: String,
    note: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}))

exports.people = people;