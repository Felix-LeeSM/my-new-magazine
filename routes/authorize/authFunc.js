const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (token) => {
    let id = '';
    try {
        id = jwt.verify(token, SECRET_KEY).id;
    } catch (err) { }
    return id;
};

function authFunc(req, res, next) {
    const { token } = req.headers;
    const id = verifyToken(token);
    res.locals.id = id;
    next();
}

module.exports = { authFunc };