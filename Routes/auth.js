const Joi = require("joi");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/UserModel");
const express = require("express");
const router = express.Router();

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(req, schema);
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password');
    }
    const requestPassword = await md5(req.body.password)
    const validPassword = user.password === requestPassword;
    if(!validPassword) {
        return res.status(400).send("Incorrect email or password");
    }

    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.send(token);
});

module.exports = router;