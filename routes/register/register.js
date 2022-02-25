
const router = require('express').Router();

const { register } = require('./registerFunc')

router.post('/', register);

module.exports = router;