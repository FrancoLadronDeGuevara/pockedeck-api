const { Router } = require('express');
const route = Router();
const {
    getAllCards, 
    getByPokedexNumber, 
    getCardById, 
    createCard, 
    editCard, 
    deleteCard,
} = require('../controllers/cards.controllers');
const { createCardsValidations, idCardValidation } = require('../validations/cards.validations');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/',isAuthenticated, isAdmin('admin'), getAllCards);

route.get('/getByPokedexNumber/:pokedexNumber',  getByPokedexNumber);

route.get('/getById/:id', isAuthenticated, isAdmin('admin'),[idCardValidation.id], validateFields, getCardById);

route.post('/create', isAuthenticated, isAdmin('admin'), [createCardsValidations.pokedexNumber, createCardsValidations.name, createCardsValidations.rarity], validateFields,  createCard);

route.patch('/edit/:id',isAuthenticated, isAdmin('admin'),  [idCardValidation.id], validateFields, editCard);

route.delete('/delete/:id', isAuthenticated, isAdmin('admin'), [idCardValidation.id], validateFields, deleteCard);

module.exports = route;
