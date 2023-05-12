const { postService } = require('../services');

const UNAUTHORIZED_USER_CODE = 401;
const UNAUTHORIZED_USER_MSG = 'Unauthorized user';

const verifyUser = async (req, res, next) => {
    const { id } = req.params;
    const { payload } = req;
    const { id: userId } = payload;

    const searchPostId = await postService.getPostById(id);

    if (searchPostId.user.id !== userId) {
      return res
        .status(UNAUTHORIZED_USER_CODE)
        .json({ message: UNAUTHORIZED_USER_MSG }); 
    }
    next();
};

module.exports = verifyUser;