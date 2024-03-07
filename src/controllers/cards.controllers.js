const {
    getCardsService,
    getByPokedexNumberService,
    getCardByIdService,
    createCardService,
    editCardService,
    deleteCardService,

} = require('../services/cards.services');
const { getUserDeckService } = require('../services/users.services');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');

const getAllCards = catchAsync(async (req, res) => {
    const response = await getCardsService();
    if (response.length === 0) return res.status(404).json('No se encontraron Cartas');
    res.status(200).json(response);
})

const getByPokedexNumber = catchAsync(async (req, res) => {
    const { pokedexNumber } = req.params;
    const response = await getByPokedexNumberService(pokedexNumber);
    if (!response) return res.status(404).json(`No se encontró la carta con el número ${pokedexNumber}`);
    res.status(200).json(response)
})

const sellCard = catchAsync(async (req, res, next) => {
    try {
        const payload = req.body;

        const user = await getUserDeckService(req.user.id);

        if (!user) return next(new ErrorHandler("Usuario no encontrado", 400));

        const cardIndex = user.userDeck.findIndex(card => card.pokedexNumber === payload.pokedexNumber);

        if (cardIndex === -1) {
            return next(new ErrorHandler("Carta no encontrada en la pokedeck del usuario", 404));
        }

        const soldCard = user.userDeck.splice(cardIndex, 1)[0];

        const updatedUserDeck = user.userDeck.filter(card => card.pokedexNumber !== soldCard.pokedexNumber);

        user.userDeck = updatedUserDeck;
        user.coins += payload.price;

        await user.save();

        res.status(200).json(user)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const getCardById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await getCardByIdService(id);
    res.status(200).json(response);
});

const createCard = catchAsync(async (req, res) => {
    const payload = req.body;
    await createCardService(payload)
    res.status(201).json('Carta creada con exito');
})

const editCard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const card = await getCardByIdService(id);

    if (!card) {
        return res.status(404).json('Carta no encontrada');
    }

    if (payload.pokedexNumber) {
        const pokedexNumberExist = await getByPokedexNumberService(payload.pokedexNumber);
        if (pokedexNumberExist) return next(new ErrorHandler('Ya existe un pokemón con ese número de Pokedex', 400))
        card.pokedexNumber = payload.pokedexNumber
    }

    if (payload.name) {
        card.name = payload.name
    }

    if (payload.rarity) {
        card.rarity = payload.rarity
    }

    if (payload.imageCard) {
        card.imageCard = payload.imageCard
    }

    if (payload.firstType) {
        card.types[0] = payload.firstType
    }

    if (payload.secondType) {
        if (payload.secondType == 'SIN 2° TIPO') {
            card.types.pop()
        } else if (card.types.length == 2) {
            card.types[1] = payload.secondType
        } else {
            card.types.push(payload.secondType)
        }
    }
    const response = await editCardService(id, card);
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
    sellCard,
    getCardById,
    createCard,
    editCard,
    deleteCard,
}
