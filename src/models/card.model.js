const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
    {
        pokedexNumber: {
            type: Number,
            required: [true, 'El número de Pokedex es obligatorio.'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
        },
        types: [{
            type: String,
            required: [true, 'El campo tipos es obligatorio'],
        }],
        imageCard: {
            type: String,
            required: [true, 'La imagen es obligatoria'],
        },
        rarity: {
            type: String,
            enum: ['Normal', 'Rara', 'Epica', 'Legendaria'],
            required: [true, 'El campo rareza es obligatorio'],
        },
        unlocked: {
            type: Boolean,
            default: false
        }
    }
);


module.exports = model('card', cardSchema);