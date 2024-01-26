const { Schema, model } = require('mongoose');

const chestSchema = new Schema(
    {
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
            enum: ['Normal', 'Raro', 'Epico', 'Legendario'],
            required: [true, 'El tipo de cofre es obligatorio'],
        },
        quantityOfCards: {
            type: Number,
            required: [true, 'La cantidad de cartas que da el cofre es obligatoria']
        },
        rarityOfCards: {
            type: String,
            enum: ['Normal', 'Rara', 'Epica', 'Legendaria'],
            required: [true, 'La rareza de cartas del cofre es obligatoria']
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

chestSchema.methods.openChest = async function (numberOfCards, cardRarity) {
    
    const filteredCards = this.cards.filter(card => card.rarity === cardRarity);

    if (filteredCards.length < numberOfCards) {
        throw new Error(`No hay suficientes cartas de tipo ${cardRarity}`);
    }

    const selectedCards = [];
    while (selectedCards.length < numberOfCards) {
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        selectedCards.push(filteredCards.splice(randomIndex, 1)[0]);
    }

    return selectedCards;
};


module.exports = model('chest', chestSchema)