'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        sourceKey: 'id',
        foreignKey: 'user_id' // Post table에 user_id라는 이름으로 추가된다.
      });
      User.hasMany(models.Comment, {
        sourceKey: 'id',
        foreignKey: 'user_id',
      });
      User.hasMany(models.Like, {
        sourceKey: 'id',
        foreignKey: 'user_id',
      });

      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nickname: DataTypes.STRING,
    profile_img_url: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};