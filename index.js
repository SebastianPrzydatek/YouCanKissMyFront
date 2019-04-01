const express = require("express")
const randomRes = require("./middlewares/randomRes");
const app = express();

app.get('/', randomRes, (req, res) => {
    res.send('hello world')
});

app.listen(3000);