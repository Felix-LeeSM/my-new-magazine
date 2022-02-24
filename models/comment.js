'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};