const sessions = require("../sessions");

module.exports = async (req, res, next) => {

    const session = await sessions.get(req.headers['session-token']);

    if (session) {
        req.session = session;
        return next();
    }
    res.status(401).send("non-authorized");
}
