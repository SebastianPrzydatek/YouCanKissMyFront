const express = require("express")
const randomRes = require("./middlewares/randomRes");
const app = express();
const mongoose = require('mongoose');
var db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://seba:Brak123!@ds127376.mlab.com:27376/heroku_59361kcv', { useNewUrlParser: true });

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  second_name: String,
  note: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
})


const noteSchema = new Schema({
  note: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'Users'  }]
})

const Users = mongoose.model('Users', userSchema);
const Note = mongoose.model('Note', noteSchema);

const singleUser = new Users({
  _id: new mongoose.Types.ObjectId(),
  first_name: 'Adam',
  second_name: 'Drwal',
});


singleUser.save(function (err) {
  if (err) return handleError(err);

  const story = new Note({
    note: 'Lorem Ipsum',
    author: singleUser._id
  });

  story.save(function (err) {
    if (err) return handleError(err)
  })
})

db.once('open', function () {
  Note.
  findOne({ note: 'Lorem Ipsum' }).
  populate('Users').
  exec(function (err, note) {
    if (err) return handleError(err);
    console.log('The author is %s', note);
    // prints "The author is Ian Fleming"
  });
});

app.get('/', randomRes, (req, res) => {
    res.send()
});

app.listen(3000);