const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const router = require('express')();

router.get('/', async (req, res) => {
    const { id } = res.locals;
    if (!id) {
        res.send({
            success: false,
            errorMessage: '로그인 후 이용해주세요'
        });
        return;
    }
    const user = await User.findOne({
        where: { id },
        attributes: [nickname, profile_img_url]
    });
    res.send({
        id,
        nickname: user.nickname,
        profile_img_url: user.profile_img_url
    });
});

module.exports = router;
