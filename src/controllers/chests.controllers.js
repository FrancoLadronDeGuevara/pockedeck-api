const {
    getChestsService,
    getChestByIdService,
    createChestService,
    editChestService,
    deleteChestService,
} = require('../services/chests.services');
const catchAsync = require('../utils/catchAsync');

const getAllChests = catchAsync(async (req, res) =>{
    const response = await getChestsService();
    if (response.length === 0) return res.status(404).json('No se encontraron Cofres');
    res.status(200).json(response);
})

const getChestById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await getChestByIdService(id);
    res.status(200).json(response);
});

const createChest = catchAsync(async (req, res) =>{
    const payload = req.body;
    await createChestService(payload)
    res.status(201).json('Cofre creado con exito');
});

const editChest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const response = await editChestService(id, payload);
    if (response == null) return res.status(404).json('Cofre no encontrada');
    res.status(200).json(response);
});

const deleteChest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await deleteChestService(id);
    if (response == null) return res.status(404).json('Cofre no encontrada');
    res.status(200).json(response);
});

module.exports = {
    getAllChests,
    getChestById,
    createChest,
    editChest,
    deleteChest
}