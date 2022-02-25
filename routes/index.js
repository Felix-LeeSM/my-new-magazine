const router = require('express')();

const registerRouter = require('./register/register');
const loginRouter = require('./login/login');
const authorizeRouter = require('./authorize/authorize');
const postRouter = require('./post/post');
const commentRouter = require('./comment/comment');
const likeRouter = require('./like/like');
const meRouter = require('./me/me');

router.use(authorizeRouter)
router.use('/post', [postRouter, likeRouter]);
router.use('/login', loginRouter);
router.use('/register', [registerRouter]);
router.use('/comment', [commentRouter]);
router.use('/me', meRouter);

module.exports = router;