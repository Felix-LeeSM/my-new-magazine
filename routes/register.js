const Op = require('sequelize').Op;
const joi = require('joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

const registerSchema = joi.object({
    id: joi.string().min(3).max(25).required().email({ minDomainSegments: 2 }),
    nickname: joi.string().alphanum().min(3).max(9).required(),
    profile_img_url: joi.string().required(),
    password: joi.string().min(5).max(20).required(),
    password_check: joi.string().min(5).max(20).required()
});



router.post('/', async (req, res) => {
    const { id, nickname, password, password_check, profile_img_url } = req.body;

    if (registerSchema.validate(req.body).error ||
        password !== password_check ||
        password.includes(nickname)) {

        res.send({
            success: false,
            errorMessage: '다시 입력해주세요.'
        });
        return;
    }

    const existUser = await User.findOne({
        where: {
            [Op.or]: [
                { nickname },
                { id }
            ]
        }
    });

    if (existUser) {
        res.send({
            success: false,
            errorMessage: '닉네임 또는 아이디가 중복되는 유저가 있습니다.'
        });
        return;
    }

    // 가입 하면 됨!
    await User.create({
        id,
        nickname,
        password,
        profile_img_url
    })
    res.send({
        success: true
    })
});

module.exports = router;