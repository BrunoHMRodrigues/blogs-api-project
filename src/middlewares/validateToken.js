const { verifyToken } = require('../auth/authFunctions');
// const { User } = require('../models');

const TOKEN_INVALID_CODE = 401;
const TOKEN_NOT_FOUND = 'Token not found';
const TOKEN_INVALID_MSG = 'Expired or invalid token';

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(TOKEN_INVALID_CODE).json({ message: TOKEN_NOT_FOUND });
    const { data } = verifyToken(authorization);

    req.payload = data;

    // const user = await User.findOne({ where: { id: data.id } });
    // console.log('user', user);
    // if (!user) {
    //   return res.status(TOKEN_INVALID_CODE)
    //     .json({ message: TOKEN_INVALID_MSG }); 
    // } 
    next();
  } catch (error) {
    res.status(TOKEN_INVALID_CODE).json({ 
      message: TOKEN_INVALID_MSG,
      error: 'É necessário um token válido par acessar esse endpoint',
    });
  }
};

module.exports = validateToken;