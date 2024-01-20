const { Router } = require('express');
const route = Router();
const {
    getAllCards, 
    getByPokedexNumber, 
    getCardById, 
    createCard, 
    editCard, 
    deleteCard
} = require('../controllers/cards.controllers');
const { createCardsValidations, idCardValidation } = require('../validations/cards.validations');
const { isAuthenticated, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllCards);

route.get('/getByPokedexNumber/:pokedexNumber', isAuthenticated, getByPokedexNumber);

route.get('/getById/:id', isAuthenticated, validateRole,[idCardValidation.id], validateFields, getCardById);

route.post('/create', [createCardsValidations.pokedexNumber, createCardsValidations.name, createCardsValidations.rarity], validateFields, isAuthenticated, validateRole, createCard);

route.patch('/edit/:id', isAuthenticated, validateRole, [idCardValidation.id], validateFields, editCard);

route.delete('/delete/:id', isAuthenticated, validateRole, [idCardValidation.id], validateFields, deleteCard);

module.exports = route;
