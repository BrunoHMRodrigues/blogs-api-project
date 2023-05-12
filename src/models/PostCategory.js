/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
        postId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'blog_posts',
            key: 'id',
          }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'categories',
              key: 'id',
            }
          },
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
    );
    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'postsCategories',
      });

      models.BlogPost.belongsToMany(models.Category, {
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'categories',
      });
    };
    return PostCategory;
  };