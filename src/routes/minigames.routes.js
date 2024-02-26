const { Router } = require('express');
const route = Router();
const { getGuessPokemonCoins, resetUserScore, getRanking, spinWheel } = require('../controllers/minigames.controllers');
const { isAuthenticated } = require('../middlewares/auth');

route.patch('/guessPokemonCoins', isAuthenticated, getGuessPokemonCoins);

route.patch('/spin-wheel', isAuthenticated, spinWheel)

route.get('/resetScore', isAuthenticated, resetUserScore);

route.get('/get-ranking', getRanking);

module.exports = route;
