const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

module.exports = async (req, res) => {
  const data = req.body;

  const user = await userService.createUser(data);

  if (user.type !== null) return res.status(user.type).json({ message: user.message });

  const { password: _password, ...userWithoutPassword } = data;
  const token = createToken(userWithoutPassword);

  return res.status(201).json({ token });
};