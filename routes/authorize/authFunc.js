const jwt = require('jsonwebtoken');

function authFunc(req, res, next) {
    try {
        const { token } = req.headers;
        const { id } = jwt.verify(token, 'secret');
        res.locals = { id }

    } catch (err) {
        // 토큰이 유효하지 않음
        res.locals = { id: '' }
    }
    next();
}

module.exports = { authFunc };