const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

const USER_NOT_EXIST_CODE = 404;
const USER_NOT_EXIST_MSG = 'User does not exist';

const createUser = async (req, res) => {
  const data = req.body;

  const user = await userService.createUser(data);

  if (user.type !== null) return res.status(user.type).json({ message: user.message });

  const { password: _password, ...userWithoutPassword } = data;
  const token = createToken(userWithoutPassword);

  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) return res.status(USER_NOT_EXIST_CODE).json({ message: USER_NOT_EXIST_MSG });
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getAll,
  getUserById,
};