const { postService } = require('../services');

const POST_NOT_EXIST_CODE = 404;
const POST_NOT_EXIST_MSG = 'Post does not exist';

const verifyPostExist = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  if (!post) return res.status(POST_NOT_EXIST_CODE).json({ message: POST_NOT_EXIST_MSG });
  next();
};

module.exports = verifyPostExist;