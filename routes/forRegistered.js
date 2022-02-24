const router = require('express')();

router.use((req, res, next) => {
    const { id } = res.locals;
    if (!id) {
        res.status(400).send({
            success: false,
            errorMessage: '회원만 이용할 수 있는 기능입니다.'
        });
        return;
    }
    next();
});

module.exports = router;