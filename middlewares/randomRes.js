module.exports = (req, res, next) => {
    if (Math.random() >= 0.5) {
        return res.send('ads')
    }
    next();
}