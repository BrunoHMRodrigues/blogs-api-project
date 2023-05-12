const { BlogPost, PostCategory, sequelize } = require('../models');
const verifyCategoryIds = require('../validations/verifyCategoryIds');

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

module.exports = {
  createBlogPost,
};