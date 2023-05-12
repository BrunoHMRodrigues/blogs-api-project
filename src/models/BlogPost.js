/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      'BlogPost',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'User',
            key: 'id',
          }
        },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
      },
      {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
      },
    );
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'users',
      });
    };
    return BlogPost;
  };