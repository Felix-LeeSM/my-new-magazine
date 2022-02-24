const router = require('express')();

const registerRouter = require('./register');
const loginRouter = require('./login');
const authorizeRouter = require('./authorize');
const postRouter = require('./post');
const commentRouter = require('./comment');
const likeRouter = require('./like');
const logoutRouter = require('./logout');
const meRouter = require('./me');

router.use(authorizeRouter)
router.use('/post', [postRouter, likeRouter]);
router.use('/login', loginRouter);
router.use('/register', [registerRouter]);
router.use('/comment', [commentRouter]);
router.use('/logout', logoutRouter);
router.use('/me', meRouter);

module.exports = router;