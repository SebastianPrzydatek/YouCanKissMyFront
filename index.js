const express = require("express")
const randomRes = require("./middlewares/randomRes");
const app = express();
const mongoose = require('mongoose');
var db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://seba:Brak123!@ds127376.mlab.com:27376/heroku_59361kcv', { useNewUrlParser: true });

var userSchema = new Schema({
  first_name: String,
  second_name: String,
  age: Number,
  profession: String,
  hobbys: String,
})

const saveToDataBase = false


const Users = mongoose.model('Users', userSchema);
const singleUser = new Users({
  first_name: 'Adam',
  second_name: 'Drwal',
  age: 35,
  profession: 'Programista',
  hobbys: 'Reducery, statey, rootReducery, tworzenie nowych aplikacji, nienawidzę utrzymywania aplikacji, po co komu długopis skoro mam smartfona i 10 aplikacji do zapisywania',
});

var userData = [{
  first_name: '',
  second_name: '',
  age: '',
  profession: '',
  hobbys: '',
}]

if (saveToDataBase) {
  singleUser.save()
}

db.once('open', function () {
  Users.find({}, function (err, data) {
    data.map(key => {
      userData.push({
        first_name: key.first_name,
        second_name: key.second_name,
        age: key.age,
        profession: key.profession,
        hobbys: key.hobbys,
      })
    })
  });
});

app.get('/', randomRes, (req, res) => {
    res.send(
    userData.map(user => (
      'Imie: ' + user.first_name + ', ' +
      'Nazwisko: ' + user.second_name + ', ' +
      'Wiek: ' + user.age + ', ' +
      'Zawód: ' + user.profession + ', ' +
      'Hobby: ' + user.hobbys
    ))
  )
});

app.post('/register', register);

function register(req, res, next) {
    create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.password = md5(userParam.password);
    }


    await user.save();
}


app.listen(3000);
