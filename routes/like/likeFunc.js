const { Like, Post } = require('../../models')

async function postLike(req, res) {
    const { id } = res.locals;
    if (!id) {
        res.status(401).send({
            success: false,
            errorMessage: '로그인 후 이용해주세요.'
        });
        return;
    }

    const post_id = parseInt(req.params.postId);
    const post = await Post.findOne({ where: { id: post_id } });
    if (!post) {
        res.status(401).send({
            success: false,
            errorMessage: '존재하지 않는 게시글입니다.'
        });
        return;
    }

    const like = await Like.findOne({ where: { user_id: id, post_id } });
    if (like) {
        res.status(401).send({
            success: false,
            errorMessage: '이미 좋아요한 게시글입니다.'
        })
        return;
    }

    await Like.create({
        post_id,
        user_id: id
    });

    res.status(201).send({
        success: true
    });
}

async function deleteLike(req, res) {
    const { id } = res.locals;
    if (!id) {
        res.status(401).send({
            success: false,
            errorMessage: '로그인 후 이용해주세요.'
        });
        return;
    }

    const post_id = parseInt(req.params.postId);

    const like = await Like.findOne({ where: { user_id: id, post_id } });
    if (!like) {
        res.status(401).send({
            success: false,
            errorMessage: '좋아요를 하지 않은 게시글입니다.'
        })
        return;
    }

    const post = await Post.findOne({ where: { id: post_id } });
    if (!post) {
        res.status(401).send({
            success: false,
            errorMessage: '존재하지 않는 게시글입니다.'
        });
        return;
    }

    await Like.destroy({ where: { post_id, user_id: id } });

    res.send({
        success: true
    });
}

module.exports = { postLike, deleteLike };