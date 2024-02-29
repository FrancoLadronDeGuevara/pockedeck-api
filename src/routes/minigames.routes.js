const { Router } = require('express');
const route = Router();
const { getGuessPokemonCoins, resetUserScore, getRanking, spinWheel, getFlapHaunterCoins } = require('../controllers/minigames.controllers');
const { isAuthenticated } = require('../middlewares/auth');

route.patch('/guessPokemonCoins', isAuthenticated, getGuessPokemonCoins);

route.patch('/flap-haunter-coins', isAuthenticated, getFlapHaunterCoins);

route.patch('/spin-wheel', isAuthenticated, spinWheel);

route.get('/resetScore', isAuthenticated, resetUserScore);

route.get('/get-ranking', getRanking);

module.exports = route;
