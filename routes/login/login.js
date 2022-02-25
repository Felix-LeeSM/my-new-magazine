const router = require('express').Router();

const { logIn } = require('./loginFunc')

router.post('/', logIn);

module.exports = router;