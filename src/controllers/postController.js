const { postService } = require('../services');

const MISSING_FIELDS_CODE = 400;
const MISSING_FIELDS_MSG = 'Some required fields are missing';

const createBlogPost = async (req, res) => {
  const data = req.body;
  const { title, content, categoryIds } = data;

  if (!title || !content || !categoryIds) {
    return res
      .status(MISSING_FIELDS_CODE)
      .json({ message: MISSING_FIELDS_MSG }); 
  }

  const post = await postService.createBlogPost(data);

  return res.status(201).json(post);
};

module.exports = {
  createBlogPost,
};