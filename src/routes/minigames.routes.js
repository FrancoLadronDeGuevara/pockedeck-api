const { Router } = require('express');
const route = Router();
const { getGuessPokemonCoins, resetUserScore, getRanking } = require('../controllers/minigames.controllers');
const { isAuthenticated } = require('../middlewares/auth');

route.patch('/guessPokemonCoins', isAuthenticated, getGuessPokemonCoins);

route.get('/resetScore', isAuthenticated, resetUserScore);

route.get('/get-ranking', getRanking)

module.exports = route;
