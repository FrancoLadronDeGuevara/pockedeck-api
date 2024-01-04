const { Router } = require('express');
const { login } = require('../controllers/login.controllers');
const route = Router();

route.post('/', login);

module.exports = route;