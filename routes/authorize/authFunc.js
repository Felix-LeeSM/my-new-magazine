const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const SECRET_KEY = process.env.SECRET_KEY;

function authFunc(req, res, next) {
    try {
        const { token } = req.headers;
        const { id } = jwt.verify(token, SECRET_KEY);
        res.locals = { id }

    } catch (err) {
        // 토큰이 유효하지 않음
        res.locals = { id: '' }
    }
    next();
}

module.exports = { authFunc };