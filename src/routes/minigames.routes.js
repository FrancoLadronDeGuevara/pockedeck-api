const { Router } = require('express');
const route = Router();
const { getGuessPokemonCoins, resetUserScore } = require('../controllers/minigames.controllers');
const { isAuthenticated } = require('../middlewares/auth');

route.patch('/guessPokemonCoins', isAuthenticated, getGuessPokemonCoins);

route.get('/resetScore', isAuthenticated, resetUserScore);

module.exports = route;
