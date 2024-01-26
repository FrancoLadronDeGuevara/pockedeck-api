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

route.get('/getById/:id',  [idChestValidation.id], validateFields, getChestById);

route.post('/create', [createChestsValidations.name, createChestsValidations.description, createChestsValidations.price, createChestsValidations.typeName, createChestsValidations.cards], validateFields,  createChest);

route.patch('/edit/:id',  [idChestValidation.id], validateFields, editChest);

route.delete('/delete/:id',  [idChestValidation.id], validateFields, deleteChest);

module.exports = route;