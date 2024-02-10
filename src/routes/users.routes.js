const { Router } = require('express');
const route = Router();
const { 
    loginUser,
    logoutUser,
    getAllUsers,
    createUser, 
    editUser, 
    updateUser,
    getUser, 
    deleteUser,
    getUserDeck,
} = require('../controllers/users.controllers');
const { createUsersValidations, idUserValidation } = require('../validations/users.validations');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.post('/create', [createUsersValidations.email, createUsersValidations.password], validateFields, createUser);

route.post('/login-user', loginUser);

route.get('/logout-user', logoutUser);

route.get('/getUser', isAuthenticated, getUser);

route.get('/userDeck', isAuthenticated, getUserDeck);

route.get('/', isAuthenticated, isAdmin('admin'), getAllUsers);

route.patch('/edit/:id', isAuthenticated, isAdmin('admin'), [idUserValidation.id], validateFields, editUser);

route.patch('/update/:id', isAuthenticated, updateUser)

route.delete('/delete/:id', isAuthenticated, isAdmin('admin'), [idUserValidation.id], validateFields, deleteUser);

module.exports = route;