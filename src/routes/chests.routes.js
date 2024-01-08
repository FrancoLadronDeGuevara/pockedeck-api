const { Router } = require('express');
const route = Router();
const {
    getAllChests,
    getChestById, 
    createChest, 
    editChest, 
    deleteChest
} = require('../controllers/chests.controllers');
const { createChestsValidations, idChestValidation } = require('../validations/chests.validations');
const { isAuthenticated, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', getAllChests);

route.get('/getById/:id', isAuthenticated, validateRole, [idChestValidation.id], validateFields, getChestById);

route.post('/create', [createChestsValidations.name, createChestsValidations.description, createChestsValidations.price, createChestsValidations.typeName, createChestsValidations.cards], validateFields, isAuthenticated, validateRole, createChest);

route.patch('/edit/:id', isAuthenticated, validateRole, [idChestValidation.id], validateFields, editChest);

route.delete('/delete/:id', isAuthenticated, validateRole, [idChestValidation.id], validateFields, deleteChest);

module.exports = route;