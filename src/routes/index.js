const express = require('express');

// const getPosts = require('../controllers/posts');
// const { createUser, getUsers } = require('../controllers/users');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
// const validateJWT = require('../middleware/validateJWT');

const apiRoutes = express.Router();

apiRoutes.post('/login', loginController);

apiRoutes.post('/user', userController);

module.exports = apiRoutes;