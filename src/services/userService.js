const { User } = require('../models');
const validateEmail = require('../validations/validateEmail');

const FIELD_INVALID_CODE = 400;
const USER_ALREADY_EXISTS_CODE = 409;
const NAME_INVALID_MSG = '"displayName" length must be at least 8 characters long';
const EMAIL_INVALID_MSG = '"email" must be a valid email';
const PASSWORD_INVALID_MSG = '"password" length must be at least 6 characters long';
const USER_ALREADY_EXISTS_MSG = 'User already registered';

const getUserByEmailPassword = (email, password) => User.findOne({ where: { email, password } });

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (data) => {
  const { displayName, email, password } = data;

  if (displayName.length < 8) return { type: FIELD_INVALID_CODE, message: NAME_INVALID_MSG };

  if (!validateEmail(email)) return { type: FIELD_INVALID_CODE, message: EMAIL_INVALID_MSG };
  
  if (password.length < 6) return { type: FIELD_INVALID_CODE, message: PASSWORD_INVALID_MSG };

  const userAlreadyRegistered = await getUserByEmail(email);
  if (userAlreadyRegistered) {
    return { 
      type: USER_ALREADY_EXISTS_CODE,
      message: USER_ALREADY_EXISTS_MSG,
    }; 
  }
  await User.create(data);

  return { type: null };
};

const getAll = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) => User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

const deleteUserMe = (userId) => {
  User.destroy({ where: { id: userId } });
};

module.exports = {
  getUserByEmailPassword,
  getUserByEmail,
  createUser,
  getAll,
  getUserById,
  deleteUserMe,
};