const express = require('express');

// const getPosts = require('../controllers/posts');
// const { createUser, getUsers } = require('../controllers/users');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');
// const validateJWT = require('../middleware/validateJWT');

const apiRoutes = express.Router();

apiRoutes.post('/login', loginController);

apiRoutes.post('/user', userController.createUser);

apiRoutes.get('/user/:id', validateToken, userController.getUserById);

apiRoutes.get('/user', validateToken, userController.getAll);

module.exports = apiRoutes;