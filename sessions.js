const session = {}
const { User } = require('./Models/UserModel');

function set( token, user) {
    session[token] = user;
}


async function get(token) {
    // return session[token];
    token;
    return await User.findOne({ email: "test5@gmail.com" });
}


exports.set = set;
exports.get = get;
