const { User, validate } = require('../Models/UserModel');
const express = require("express");
const router = express.Router();
const md5 = require("md5");

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exist!');
    }
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = await md5(user.password);
    
    await user.save();
    
    res.send(user);
});

module.exports = router;