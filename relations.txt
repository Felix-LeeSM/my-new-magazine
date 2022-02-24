
User hasMany(Post)
User hasMany(Comment)
User hasMany(Like)

Post belongsTo(User)

Post hasMany(like)
Post hasMany(Comment)

Comment belongsTo(User)
Comment belongsTo(Post)

Like belongsTo(User)
Like belongsTo(Post)



User.hasMany(Post, {
    foreignKey: 'user_id', // Post table에 user_id라는 이름으로 추가된다.
    onDelete: 'CASCADE',
});
Post.belongsTo(User);


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User);

User.hasMany(Like, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Like.belongsTo(User);


Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
Comment.belongsTo(Post);

Post.hasMany(Like, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Like.belongsTo(Post);


Like {
    post_id: {
        type: DataTypes.INTEGER,
            references: {
            model: Post,
                key: 'id'
        }
    },
    user_id: {
        type: DataTypes.STRING,
            references: {
            model: User,
                key: 'id'

        }
    }
}


Comment {
    post_id: {
        type: DataTypes.INTEGER,
            references: {
            model: Post,
                key: 'id'
        }
    },
    user_id: {
        type: DataTypes.STRING,
            references: {
            model: User,
                key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING
    }
}



Post.belongsTo(User)



{
    id: "ASDF@ASDF.com",
        password: "ASDFASDF",
            password_check: "ASDFASDF",
                nickname: "ASDFE",
                    profile_img_url: "ASDF"
}