const express = require('express');
const { Comment, Post, User, Like } = require('../models')
const router = express.Router();


// 전체 게시글 불러오기
router.get('/', async (req, res) => {
    const { id, logOn } = res.locals;
    const post = await Post.findAll({
        order: [['id', 'DESC']],
        include: [Like, Comment]
    }); // 수정 되어도 글은 밑에 위치하게 됨.

    if (!post.length) {
        res.send({
            success: true,
            post,
            Message: '작성된 글이 없습니다.'
        });
        return;
    }


    for (let each of post) {
        each.dataValues.byMe = id === each.user_id ? true : false;
        const { nickname, profile_img_url } = await User.findOne({
            attributes: ['nickname', 'profile_img_url'],
            where: { id: each.user_id }
        });
        each.dataValues.nickname = nickname;
        each.dataValues.profile_img_url = profile_img_url;
        each.dataValues.like_count = each.Likes.length;
        each.dataValues.comment_count = each.Comments.length;
        const like = each.Likes.find((each) => {
            return each.user_id === id
        })
        each.dataValues.like_check = like ? true : false;
    }

    res.send({
        Auth: id ? true : false,
        success: true,
        post
    });
    return;

});

// 특정 게시글 조회
router.get('/:postId', async (req, res) => {
    const { id } = res.locals;
    const post_id = parseInt(req.params.postId);

    // 게시글이 존재하는지?
    let post = await Post.findOne({
        include: [Comment, Like],
        where: { id: post_id }
    });
    if (!post) {
        res.send({
            success: false,
            errorMessage: '해당 글이 존재하지 않습니다.'
        })
        return;
    }

    // 좋아요를 몇개 눌렀는지?, 내가 좋아요 눌렀는지?

    post.dataValues.like_count = post.Likes.length;
    if (!id) {
        res.send({
            Auth: false,
            success: true,
            post
        });
        return;
    }

    const like = post.Likes.find((each) => {
        return each.user_id === id;
    });
    post.dataValues.byMe = id === post.user_id ? true : false;
    post.dataValues.like_check = like ? true : false;
    post.dataValues.profile_img_url = await User.findOne({
        where: { id: post.user_id },
        attributes: ['profile_img_url']
    }).profile_img_url;

    // 댓글들과 댓글 작성 유저들의 프로필 사진

    for (let comment of post.Comments) {
        const user = await User.findOne({
            where: { id: comment.user_id },
            attributes: ['profile_img_url', 'id']
        });
        comment.dataValues.profile_img_url = user.profile_img_url;
        comment.dataValues.byMe = comment.user_id === id ? true : false;
    }

    res.send({
        Auth: id ? true : false,
        success: true,
        post
    });
});

// 게시글 작성
// 이미지 받는 걸 추가해야함.
router.post('/', async (req, res) => {
    const { id } = res.locals;
    const { content, img_url, type } = req.body;

    if (!(content && img_url)) {
        res.status(401).send({
            success: false,
            errorMessage: '게시글을 작성해주세요.'
        });
        return;
    }

    await Post.create({
        content,
        user_id: id,
        img_url,
        type
    });

    res.status(201).send({
        success: true
    });
    return;
});

// 게시글 수정
router.put('/:postId', async (req, res) => {
    const { id } = res.locals;

    const post_id = parseInt(req.params.postId);

    const post = await Post.findOne({
        where: { id: post_id },
        attributes: ['user_id']
    });

    if (!post || post.user_id !== id) {
        res.status(401).send({
            success: false,
            errorMessage: '해당 글을 수정할 수 없습니다.'
        })
        return;
    }

    const { content, img_url, type } = req.body;
    await Post.update(
        { content: content, img_url, type },
        { where: { id: post_id } }
    );

    res.send({
        Auth: true,
        success: true,
    })
});

// 게시글 삭제
router.delete('/:postId', async (req, res) => {
    const { id } = res.locals;

    const post_id = parseInt(req.params.postId);

    const post = await Post.findOne({
        where: { id: post_id },
        attributes: ['user_id']
    });

    if (!post || post.user_id !== id) {
        res.status(401).send({
            success: false,
            errorMessage: '해당 글을 삭제할 수 없습니다.'
        })
        return;
    }
    // 이미지 파일 삭제

    await Post.destroy({
        where: {
            post_id
        }
    });
    await Like.destroy({
        where: {
            post_id
        }
    });
    await Comment.destroy({
        where: {
            post_id
        }
    });

    res.send({
        Auth: true,
        success: true,
    });
});

module.exports = router;