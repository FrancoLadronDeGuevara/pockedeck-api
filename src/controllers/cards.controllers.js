const {
    getCardsService,
    getByPokedexNumberService,
    getCardByIdService,
    createCardService,
    editCardService,
    deleteCardService,
} = require('../services/cards.services');
const catchAsync = require('../utils/catchAsync');

const getAllCards = catchAsync(async (req, res) =>{
    const response = await getCardsService();
    if (response.length === 0) return res.status(404).json('No se encontraron Cartas');
    res.status(200).json(response);
})

const getByPokedexNumber = catchAsync(async (req, res) =>{
    const {pokedexNumber} = req.params;
    const response = await getByPokedexNumberService(pokedexNumber);
    if (!response) return res.status(404).json(`No se encontró la carta con el número ${pokedexNumber}`);
    res.status(200).json(response)
})

const getCardById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await getCardByIdService(id);
    res.status(200).json(response);
});

const createCard = catchAsync(async (req, res) =>{
    const payload = req.body;

    await createCardService(payload)
    res.status(201).json('Carta creada con exito');
})

const editCard = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const response = await editCardService(id, payload);
    if (response == null) return res.status(404).json('Carta no encontrada');
    res.status(200).json(response);
});

const deleteCard = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await deleteCardService(id);
    if (response == null) return res.status(404).json('Carta no encontrada');
    res.status(200).json(response);
});

module.exports = {
    getAllCards,
    getByPokedexNumber,
    getCardById,
    createCard,
    editCard,
    deleteCard
}
