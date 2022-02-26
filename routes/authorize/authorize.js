const router = require('express').Router();

const { authFunc } = require('./authFunc');

router.use(authFunc);

module.exports = router;