const router = require('express').Router();

const { postComment, putComment, deleteComment } = require('./commentFunc');

router.post('/:postId', postComment);

router.put('/:postId/:commentId', putComment);

router.delete('/:postId/:commentId', deleteComment);

module.exports = router;