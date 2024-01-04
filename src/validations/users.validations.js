/* eslint-disable no-unused-vars */

const { body, param } = require('express-validator');
const { getByEmailService } = require('../services/users.services');

const emailExistValidation = async (email) => {
    const emailExist = await getByEmailService(email);

    if (emailExist) {
        throw new Error(`El email ${email}, ya se encuentra en uso`);
    }
    return false;
};

const createUsersValidations = {
    email: body('email')
        .isEmail()
        .withMessage('El email no es válido')
        .not()
        .isEmpty()
        .withMessage('Este campo es requerido')
        .custom(emailExistValidation),

    password: body('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .withMessage('La contraseña no cumple con los requisitos'),
};

const idUserValidation = {
    id: param('id').isMongoId().withMessage('El id no es un ObjectId'),
};


module.exports = {
    createUsersValidations,
    idUserValidation,
};
