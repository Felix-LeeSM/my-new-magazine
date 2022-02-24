const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const router = require('express')();

router.get('/', async (req, res) => {
    const { token } = req.headers;
    try {
        const { id } = jwt.verify(token, 'secret');
        const user = await User.findOne({
            where: { id },
            attributes: [nickname, profile_img_url]
        });
        res.send({
            id,
            nickname: user.nickname,
            profile_img_url: user.profile_img_url
        });
    } catch (err) { }
    res.status(400).send({
        success: false,
        errorMessage: '로그인 하지 않은 상태입니다.'
    });
});

module.exports = router;
