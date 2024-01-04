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
const { validateToken, validateRole } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validateFields');

route.get('/', validateToken, validateRole, getAllChests);

route.get('/getById/:id', validateToken, validateRole, [idChestValidation.id], validateFields, getChestById);

route.post('/create', [createChestsValidations.name, createChestsValidations.description, createChestsValidations.price, createChestsValidations.typeName, createChestsValidations.cards], validateFields, validateToken, validateRole, createChest);

route.patch('/edit/:id', validateToken, validateRole, [idChestValidation.id], validateFields, editChest);

route.delete('/delete/:id', validateToken, validateRole, [idChestValidation.id], validateFields, deleteChest);

module.exports = route;