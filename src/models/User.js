/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        displayName: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        timestamps: false,
        tableName: 'users',
        underscored: true,
      },
    );
    User.associate = (models) => {
      User.hasMany(models.BlogPost, {
        foreignKey: { name: 'userId', field: 'user_id' },
        as: 'blogPosts',
      });
    };
    return User;
  };