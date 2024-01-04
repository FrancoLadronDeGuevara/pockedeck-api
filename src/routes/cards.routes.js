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
const { validateToken, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllCards);

route.get('/getByPokedexNumber/:pokedexNumber', validateToken, getByPokedexNumber);

route.get('/getById/:id', validateToken, validateRole,[idCardValidation.id], validateFields, getCardById);

route.post('/create', [createCardsValidations.pokedexNumber, createCardsValidations.name, createCardsValidations.types, createCardsValidations.imageCard, createCardsValidations.rarity], validateFields, validateToken, validateRole, createCard);

route.patch('/edit/:id', validateToken, validateRole, [idCardValidation.id], validateFields, editCard);

route.delete('/delete/:id', validateToken, validateRole, [idCardValidation.id], validateFields, deleteCard);

module.exports = route;
