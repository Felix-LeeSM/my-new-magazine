const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // 이미 로그인 한 상태이면
        const { token } = req.headers;
        jwt.verify(token, 'secret');
        res.status(400).send({
            success: false,
            errorMessage: '이미 로그인 된 상태입니다.'
        });
        return;
    } catch (err) { }

    const { id, password } = req.body;

    if (!(id && password)) {
        res.status(400).send({
            success: false,
            errorMessage: '아이디나 비밀번호를 확인해주세요.'
        });
        return;
    }

    const existUser = await User.findOne({ where: { id, password } });

    if (!existUser) {
        res.status(400).send({
            success: false,
            errorMessage: '아이디나 비밀번호를 확인해주세요.'
        });
        return;
    }

    const token = jwt.sign(
        { id },
        'secret',
        { expiresIn: 3600 }
    );

    res.status(201).send({
        token,
        success: true
    });
});

module.exports = router;