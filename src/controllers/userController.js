const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

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

module.exports = {
  createUser,
  getAll,
};