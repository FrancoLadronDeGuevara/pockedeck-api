const { body, param } = require('express-validator');

const createCardsValidations = {
    pokedexNumber: body('pokedexNumber')
    .not()
    .isEmpty()
    .isInt()
    .withMessage('El número de Pokedex debe ser un valor entero'),
    
    name: body('name')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.'),

    rarity: body('rarity')
    .isIn(['Normal', 'Rara', 'Epica', 'Legendaria'])
    .withMessage('La rareza debe ser una de: Normal, Rara, Epica, Legendaria.'),
}

const idCardValidation = {
    id: param('id').isMongoId().withMessage('El id no es un ObjectId'),
};

module.exports = {
    createCardsValidations,
    idCardValidation
}