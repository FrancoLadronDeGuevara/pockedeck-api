const { Schema, model } = require('mongoose');
const User = require('../models/user.model');
const Card = require('../models/card.model');

const chestSchema = new Schema(
    {
        chestImage: {
            type: String,
            required: [true, 'La imagen del cofre es obligatoria']
        },
        name: {
            type: String,
            required: [true, 'El nombre del cofre es obligatorio'],
        },
        description: {
            type: String,
            required: [true, 'La descripción del cofre es obligatoria']
        },
        typeName: {
            type: String,
            enum: ['Normal', 'Raro', 'Épico', 'Legendario'],
            required: [true, 'El tipo de cofre es obligatorio'],
        },
        quantityOfCards: {
            type: Number,
            required: [true, 'La cantidad de cartas que da el cofre es obligatoria']
        },
        rarityOfCards: {
            type: String,
            enum: ['Normal', 'Rara', 'Epica', 'Legendaria'],
        },
        price: {
            type: Number,
            required: [true, 'El precio del cofre es obligatorio'],
        },
        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card',
        }],
    }
)

chestSchema.methods.openChest = async function (userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.coins < this.price) {
        throw new Error('No tienes suficientes monedas para abrir este cofre');
    }

    user.coins -= this.price;
    await user.save();

    const chestCards = await Card.find({
        _id: { $in: this.cards }
    });

    const userCardsIds = user.cards?.map(card => card._id) ?? [];

    const numberOfCardsToDeliver = Math.min(
        this.quantityOfCards,
        chestCards.length
    );

    let cardsToDeliver = [];

    while (cardsToDeliver.length < numberOfCardsToDeliver) {
        const randomIndexes = randomCards(
            chestCards.length,
            numberOfCardsToDeliver
        );

        cardsToDeliver = randomIndexes
            .map(index => chestCards[index])
            .filter(card => !userCardsIds.includes(card._id));
    }

    user.userDeck.push(...cardsToDeliver);
    await user.save();

    return cardsToDeliver;
};

function randomCards(totalNumberOfCards, cardsToGive) {
    const indexOfCards = [];
    while (indexOfCards.length < cardsToGive) {
        const randomIndex = Math.floor(Math.random() * totalNumberOfCards);
        if (!indexOfCards.includes(randomIndex)) {
            indexOfCards.push(randomIndex);
        }
    }
    return indexOfCards;
}


module.exports = model('chest', chestSchema)