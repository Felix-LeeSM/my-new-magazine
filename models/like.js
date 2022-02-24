'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Like.belongsTo(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Like.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};