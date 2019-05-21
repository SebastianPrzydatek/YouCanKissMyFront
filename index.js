const express = require("express")
const randomRes = require("./middlewares/randomRes");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const getNotes = require('./Note/getNotes');
const postNotes = require('./Note/postNote');
mongoose.connect('mongodb://seba:Brak123!@ds127376.mlab.com:27376/heroku_59361kcv', { useNewUrlParser: true });

// var db = mongoose.connection;
// const Schema = mongoose.Schema;


app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/notes', randomRes);
app.use('/api/notes', getNotes);
app.use('/api/notes', postNotes);

// var userSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   first_name: String,
//   second_name: String,
//   note: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
// })


// const noteSchema = new Schema({
//   note: String,
//   author: [{ type: Schema.Types.ObjectId, ref: 'Users'  }]
// })

// const Users = mongoose.model('Users', userSchema);
// const Note = mongoose.model('Note', noteSchema);

// const singleUser = new Users({
//   _id: new mongoose.Types.ObjectId(),
//   first_name: 'Adam',
//   second_name: 'Drwal',
// });


// singleUser.save(function (err) {
//   if (err) return handleError(err);

//   const story = new Note({
//     note: 'Lorem Ipsum',
//     author: singleUser._id
//   });

//   story.save(function (err) {
//     if (err) return handleError(err)
//   })
// })

// db.once('open', function () {
//   Note.
//   findOne({ note: 'Lorem Ipsum' }).
//   populate('Users').
//   exec(function (err, note) {
//     if (err) return handleError(err);
//     console.log('The author is %s', note);
//     // prints "The author is Ian Fleming"
//   });
// });

app.get('/', randomRes, (req, res) => {
    res.send()
});

app.listen(3000);
