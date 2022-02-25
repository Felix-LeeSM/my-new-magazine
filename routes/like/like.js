const { postLike, deleteLike } = require('./likeFunc')
const router = require('express').Router();

// 좋아요 누르기
router.post('/:postId/like', postLike);

// 좋아요 제거
router.delete('/:postId/like', deleteLike);


module.exports = router;