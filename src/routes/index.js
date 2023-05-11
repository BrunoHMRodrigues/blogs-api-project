const express = require('express');

// const getPosts = require('../controllers/posts');
// const { createUser, getUsers } = require('../controllers/users');
const loginController = require('../controllers/loginController');
// const validateJWT = require('../middleware/validateJWT');

const apiRoutes = express.Router();

apiRoutes.post('/login', loginController);

module.exports = apiRoutes;