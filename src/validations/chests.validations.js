const { body, param } = require('express-validator');

const createChestsValidations = {
    name: body('name')
    .not()
    .isEmpty()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.'),

    description: body('description')
    .not()
    .isEmpty()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.'),

    typeName: body('typeName')
    .isIn(['Normal', 'Raro', 'Epico', 'Legendario'])
    .withMessage('La tipo debe ser una de: Normal, Raro, Epico, Legendario.'),

    price: body('price')
    .not()
    .isEmpty()
    .isInt()
    .withMessage('El precio debe ser un valor entero'),

    cards: body('cards')
    .not()
    .isEmpty()
    .isArray()
    .withMessage('El campo cards debe ser un array.'),
}

const idChestValidation = {
    id: param('id').isMongoId().withMessage('El id no es un ObjectId'),
};

module.exports = {
    createChestsValidations,
    idChestValidation
}