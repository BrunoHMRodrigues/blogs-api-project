const { BlogPost } = require('../models');

const createBlogPost = async (data) => {
  const post = await BlogPost.create(data);

  return post;
};

module.exports = {
  createBlogPost,
};