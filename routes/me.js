const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const router = require('express')();

router.get('/', async (req, res) => {
    const { token } = req.headers;
    try {
        jwt.verify(token, 'secret');
    } catch (err) {
        res.status(400).send({
            success: false,
            errorMessage: '로그인 후 이용해주세요'
        });
        return;
    }
    const { id } = jwt.decode(token);
    const user = await User.findOne({
        where: { id },
        attributes: ['nickname', 'profile_img_url']
    });
    const nickname = user.nickname;
    const profile_img_url = user.profile_img_url;
    res.send({
        success: true,
        id,
        nickname,
        profile_img_url
    });
});

module.exports = router;
