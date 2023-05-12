const { BlogPost, PostCategory, sequelize } = require('../models');
const verifyCategoryIds = require('../validations/verifyCategoryIds');
const { User, Category } = require('../models');

const createBlogPost = async (postData) => {
  const { categoryIds } = postData;
  const allCategoriesIdsExists = await verifyCategoryIds(categoryIds);

  if (allCategoriesIdsExists.type !== null) return allCategoriesIdsExists; 

  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create(postData, { transaction: t });

    await Promise.all(postData.categoryIds.map(async (categoryId) => {
      await PostCategory.create({ categoryId, postId: post.id }, { transaction: t });
    }));
    return { type: null, message: post };
  });

  return result;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return post;
};

module.exports = {
  createBlogPost,
  getAll,
  getPostById,
};