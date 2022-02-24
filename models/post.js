'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Post.hasMany(models.Comment, {
        sourceKey: 'id',
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.Like, {
        sourceKey: 'id',
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
      });

    }
  }

  Post.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};