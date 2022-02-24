const express = require('express');
const forRegistered = require('./forRegistered');
const { Comment, Post } = require('../models');
const router = express.Router();

router.post('/:postId', forRegistered, async (req, res) => {
    const { id } = res.locals;
    const { text } = req.body;
    const post_id = parseInt(req.params.postId);
    const post = await Post.findOne({ where: { id: post_id } });

    if (!(text && post)) {
        res.send({
            success: false,
            errorMessage: '댓글을 작성할 수 없습니다.'
        });
        return;
    }


    await Comment.create({
        user_id: id,
        post_id,
        text
    })

    res.send({
        success: true
    });
});



router.put('/:postId/:commentId', forRegistered, async (req, res) => {
    const { id } = res.locals;

    const { text } = req.body;
    const comment_id = parseInt(req.params.commentId);
    const post_id = parseInt(req.params.postId);

    const comment = await Comment.findOne({ where: { id: comment_id, post_id } });
    // postId가 이상해도 위에서 걸러짐.
    if (!comment || id !== comment.user_id) {
        res.status(401).send({
            success: false,
            errorMessage: '해당 댓글을 수정할 수 없습니다.'
        })
        return;
    }

    await Comment.update({ text }, { where: { id: comment_id } })

    res.send({
        success: true
    })
});

router.delete('/:postId/:commentId', forRegistered, async (req, res) => {
    const { id } = res.locals;

    const comment_id = parseInt(req.params.commentId);
    const post_id = parseInt(req.params.postId);

    const comment = await Comment.findOne({ where: { id: comment_id, post_id } });
    // postId가 이상해도 위에서 걸러짐.
    if (!comment || id !== comment.user_id) {
        res.status(401).send({
            success: false,
            errorMessage: '해당 댓글을 삭제할 수 없습니다.'
        })
        return;
    }

    await Comment.destroy({ where: { id: comment_id } });

    res.send({
        success: true,
    })
});

module.exports = router;