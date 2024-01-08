const Card = require('../models/card.model');

const getCardsService = async () =>{
    return Card.find({});
}

const getByPokedexNumberService = async (pokedexNumber) =>{
    return Card.findOne({pokedexNumber});
}

const getCardByIdService = async (id) => {
    return Card.findById(id);
};

const createCardService = async (payload) =>{
    const newCard = new Card(payload);
    return await newCard.save();
}

const editCardService = async (id, payload) => {
    const options = {
        new: true,
    }

    return await Card.findByIdAndUpdate(id, payload, options);
}

const deleteCardService = async (id) =>{
    return Card.findByIdAndDelete(id);
}

module.exports = {
    getCardsService,
    getByPokedexNumberService,
    getCardByIdService,
    createCardService,
    editCardService,
    deleteCardService
}