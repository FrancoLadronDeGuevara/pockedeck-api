const { Router } = require('express');
const route = Router();
const {
    openChest,
    getAllChests,
    getChestById, 
    createChest, 
    editChest, 
    deleteChest
} = require('../controllers/chests.controllers');
const { createChestsValidations, idChestValidation } = require('../validations/chests.validations');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllChests);

route.post('/openChest', isAuthenticated, openChest)

route.get('/getById/:id',  [idChestValidation.id], validateFields, getChestById);

route.post('/create', isAuthenticated, isAdmin('admin'), [createChestsValidations.name, createChestsValidations.description, createChestsValidations.price], validateFields,  createChest);

route.patch('/edit/:id',  [idChestValidation.id], validateFields, editChest);

route.delete('/delete/:id',  [idChestValidation.id], validateFields, deleteChest);

module.exports = route;