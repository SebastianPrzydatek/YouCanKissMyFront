const Joi = require("joi");
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    }
}));

const validateUser = (user) => {
    const schema = {
        username: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;