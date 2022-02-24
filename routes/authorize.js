const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use((req, res, next) => {
    try {
        const { token } = req.cookies;
        // { id, nickname } 꼴로 locals.user에 들어있음.
        const { id } = jwt.verify(token, 'secret');
        res.locals = { id, logOn: true }

    } catch (err) {
        // 토큰이 유효하지 않음
        res.locals = { id: '', logOn: false }
    }
    next();
});

module.exports = router;