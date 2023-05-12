const { postService } = require('../services');

const MISSING_FIELDS_CODE = 400;
const MISSING_FIELDS_MSG = 'Some required fields are missing';

const createBlogPost = async (req, res) => {
  const data = req.body;
  const { title, content, categoryIds } = data;
  const { payload } = req;
  const postData = {
    title,
    content,
    categoryIds,
    userId: payload.id,
  };
  if (!title || !content || !categoryIds) {
    return res
      .status(MISSING_FIELDS_CODE).json({ message: MISSING_FIELDS_MSG }); 
  }
  const post = await postService.createBlogPost(postData);

  if (post.type !== null) return res.status(post.type).json({ message: post.message });

  return res.status(201).json(post.message);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  return res.status(200).json(post);
};

const editPostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(MISSING_FIELDS_CODE)
      .json({ message: MISSING_FIELDS_MSG }); 
  }

  await postService.editPostById({ id, title, content });

  const editedPost = await postService.getPostById(id);

  return res.status(200).json(editedPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;

  await postService.deletePostById(id);

  return res.status(204).json({});
};

module.exports = {
  createBlogPost,
  getAll,
  getPostById,
  editPostById,
  deletePostById,
};