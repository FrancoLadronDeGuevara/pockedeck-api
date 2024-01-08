const { Router } = require('express');
const route = Router();
const { 
    getAllUsers,
    createUser, 
    editUser, 
    getUser, 
    deleteUser, 
} = require('../controllers/users.controllers');
const { createUsersValidations, idUserValidation } = require('../validations/users.validations');
const { isAuthenticated, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllUsers);

route.get('/getUser', isAuthenticated, getUser);

route.post('/create', [createUsersValidations.email, createUsersValidations.password], validateFields, createUser);

route.patch('/edit/:id', isAuthenticated, validateRole, [idUserValidation.id], validateFields, editUser);

route.delete('/delete/:id', isAuthenticated, validateRole, [idUserValidation.id], validateFields, deleteUser);

module.exports = route;