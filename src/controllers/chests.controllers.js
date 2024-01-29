const { getCardsByNameService, getCardsByRarityService } = require('../services/cards.services');
const {
    getChestsService,
    getChestByIdService,
    createChestService,
    editChestService,
    deleteChestService,
} = require('../services/chests.services');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');

const getAllChests = catchAsync(async (req, res) => {
    const response = await getChestsService();
    if (response.length === 0) return res.status(404).json('No se encontraron Cofres');
    res.status(200).json(response);
})

const openChest = catchAsync(async (req, res, next) => {
    try {
        const { userId, chestId } = req.body;

        const chest = await getChestByIdService(chestId);

        if (!chest) {
            return res.status(404).json({ error: 'Cofre no encontrado' });
        }

        const cardsToDeliver = await chest.openChest(userId);

        res.status(200).json({ cards: cardsToDeliver });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const getChestById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await getChestByIdService(id);
    res.status(200).json(response);
});

const createChest = catchAsync(async (req, res, next) => {
    try {
        const payload = req.body;
        let cardsChest = {};

        if(payload.rarityOfCards){
            const cardsByRarity = await getCardsByRarityService(payload.rarityOfCards)
            cardsChest = {cards: cardsByRarity}
        }

        if(payload.selectedCards){
            const cardsSelected = await getCardsByNameService(payload.selectedCards)
            cardsChest.cards = cardsChest.cards ? [...cardsChest.cards, ...cardsSelected] : cardsSelected;
        }

        const chest = {
            chestImage: payload.chestImage,
            name: payload.name,
            description: payload.description,
            typeName: payload.chestType,
            quantityOfCards: payload.quantityOfCards,
            price: payload.price,
            rarityOfCards: payload.rarityOfCards,
            cards: cardsChest.cards,
        }

        await createChestService(chest)
        res.status(201).json('Cofre creado con exito');
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const editChest = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const chest = await getChestByIdService(id);

    if(!chest) return  next(new ErrorHandler('No existe el cofre', 404))

    if(payload.name){
        chest.name = payload.name;
    }

    if(payload.description){
        chest.description = payload.description;
    }

    if(payload.price){
        chest.price = payload.price;
    }

    if(payload.type){
        chest.typeName = payload.type;
    }

    if(payload.quantity){
        chest.quantityOfCards = payload.quantity;
    }

    if(payload.imageChest){
        chest.chestImage = payload.imageChest;
    }

    const response = await editChestService(id, chest);
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
    openChest,
    getAllChests,
    getChestById,
    createChest,
    editChest,
    deleteChest
}