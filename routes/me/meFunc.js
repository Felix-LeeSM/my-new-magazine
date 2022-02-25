const { User } = require('../../models/index');
const jwt = require('jsonwebtoken');

async function me(req, res, next) {
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

    if (!user) {
        res.status(401).send({
            success: false,
            errorMessage: '다시 로그인 후 이용해주세요.'
        })
        return;
    }

    const nickname = user.nickname;
    const profile_img_url = user.profile_img_url;
    res.send({
        success: true,
        id,
        nickname,
        profile_img_url
    });
}

module.exports = { me };