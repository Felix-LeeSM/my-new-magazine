const jwt = require('jsonwebtoken');

function authFunc(req, res, next) {
    try {
        const { token } = req.headers;
        // { id, nickname } 꼴로 locals.user에 들어있음.
        const { id } = jwt.verify(token, 'secret');
        res.locals = { id, logOn: true }

    } catch (err) {
        // 토큰이 유효하지 않음
        res.locals = { id: '', logOn: false }
    }
    next();
}

module.exports = { authFunc }