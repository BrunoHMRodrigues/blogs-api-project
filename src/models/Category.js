/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      'Category',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
      },
      {
        timestamps: false,
        tableName: 'categories',
      },
    );
    // User.associate = (models) => {
    //   Category.hasMany(models.posts_categories, {
    //     foreignKey: 'category_id',
    //     as: 'posts_categories',
    //   });
    // };
    return Category;
  };