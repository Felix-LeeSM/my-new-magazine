const router = require('express').Router();

const { getAllPosts, getOnePost, postPost, putPost, deletePost, idCheck } = require('./postFunc')

// 전체 게시글 불러오기
router.get('/', getAllPosts);

// 특정 게시글 조회
router.get('/:postId', getOnePost);

// 게시글 작성
router.post('/', idCheck, postPost);

// 게시글 수정
router.put('/:postId', idCheck, putPost);

// 게시글 삭제
router.delete('/:postId', idCheck, deletePost);

module.exports = router;