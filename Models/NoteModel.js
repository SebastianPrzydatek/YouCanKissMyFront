const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notes = mongoose.model('Notes', new mongoose.Schema({
    author: [{ type: Schema.Types.ObjectId, ref: 'Users'  }],
    note: String,
}))

exports.Notes = Notes;