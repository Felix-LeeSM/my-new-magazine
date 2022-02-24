const router = require('express').Router();
const authorize = require('./authorize')


router.get('/', authorize, (req, res) => {
    if (res.locals.logOn) {
        res.clearCookie(token);
        res.clearCookie('token');
        res.send({
            success: true
        });
        return;
    }

    res.send({
        success: false,
        errorMessage: '로그인 후 이용해주세요.'
    });
});

module.exports = router;