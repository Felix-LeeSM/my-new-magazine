const router = require('express')();

const { me } = require('./meFunc');

router.get('/', me);

module.exports = router.get('/', require('./meFunc').me);
