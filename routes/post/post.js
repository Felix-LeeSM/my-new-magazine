const router = require('express').Router();

const { getAllPosts, getOnePost, postPost, putPost, deletePost } = require('./postFunc')
// 전체 게시글 불러오기
router.get('/', getAllPosts);

// 특정 게시글 조회
router.get('/:postId', getOnePost);

// 게시글 작성
// 이미지 받는 걸 추가해야함.
router.post('/', postPost);

// 게시글 수정
router.put('/:postId', putPost);

// 게시글 삭제
router.delete('/:postId', deletePost);

module.exports = router;