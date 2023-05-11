const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

const isBodyValid = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o body contem todos os dados
    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    // Verificar se o email e senha estão corretos
    const user = await userService.getUserByEmailPassword(email, password);
    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const { password: _password, ...userWithoutPassword } = user.dataValues;
    const token = createToken(userWithoutPassword);
    return res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};