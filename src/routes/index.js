const express = require('express');

// const getPosts = require('../controllers/posts');
// const { createUser, getUsers } = require('../controllers/users');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');
// const validateJWT = require('../middleware/validateJWT');

const apiRoutes = express.Router();

apiRoutes.post('/login', loginController);

apiRoutes.post('/user', userController.createUser);

apiRoutes.get('/user/:id', validateToken, userController.getUserById);

apiRoutes.get('/user', validateToken, userController.getAll);

apiRoutes.post('/categories', validateToken, categoryController.createCategory);

apiRoutes.get('/categories', validateToken, categoryController.getAll);

apiRoutes.post('/post', validateToken, postController.createBlogPost);

module.exports = apiRoutes;