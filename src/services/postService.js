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

  // const simplifiedPosts = posts.map((post) => {
  //   const user = {
  //     id: post.users.id,
  //     displayName: post.users.displayName,
  //     email: post.users.email,
  //     image: post.users.image,
  //   };

  //   const categories = post.categories.map((category) => ({
  //       id: category.id,
  //       name: category.name,
  //     }));

  //   return {
  //     id: post.id,
  //     title: post.title,
  //     content: post.content,
  //     userId: post.userId,
  //     published: post.published,
  //     updated: post.updated,
  //     user,
  //     categories,
  //   };
  // });

  return posts;
};

module.exports = {
  createBlogPost,
  getAll,
};