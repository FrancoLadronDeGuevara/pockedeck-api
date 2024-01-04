const { Router } = require('express');
const route = Router();
const { 
    getAllUsers,
    createUser, 
    editUser, 
    getById, 
    deleteUser 
} = require('../controllers/users.controllers');
const { createUsersValidations, idUserValidation } = require('../validations/users.validations');
const { validateToken, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllUsers);

route.get('/getById/:id', validateToken, validateRole, [idUserValidation.id], validateFields, getById);

route.post('/create', [createUsersValidations.email, createUsersValidations.password], validateFields, createUser);

route.patch('/edit/:id', validateToken, validateRole, [idUserValidation.id], validateFields, editUser);

route.delete('/delete/:id', validateToken, validateRole, [idUserValidation.id], validateFields, deleteUser);

module.exports = route;