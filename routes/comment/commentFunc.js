const { Comment, Post } = require('../../models');

const idCheck = (req, res) => {
    const { id } = res.locals;
    if (!id) {
        res.status(401).send({
            success: false,
            errorMessage: '로그인 후 이용해주세요.'
        });
        return;
    }
    return id;
}


// 댓글 쓰기
async function postComment(req, res) {
    const id = idCheck(req, res);

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
}

// 댓글 수정
async function putComment(req, res) {
    const id = idCheck(req, res);

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
}

// 댓글 삭제
async function deleteComment(req, res) {
    const id = idCheck(req, res);

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
}

module.exports = { postComment, putComment, deleteComment };