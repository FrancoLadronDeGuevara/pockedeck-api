const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
    {
        pokedexNumber: {
            type: Number,
            required: [true, 'El número de Pokedex es obligatorio.'],
            unique: [true, 'Ya existe un Pokémon con este número de Pokedex.']
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
        price: {
            type: Number,
            default: function() {
                switch (this.rarity) {
                    case 'Normal':
                        return 10;
                    case 'Rara':
                        return 30;
                    case 'Epica':
                        return 50;
                    case 'Legendaria':
                        return 70;
                    default:
                        return 1000;
                }
            }
        }
    }
);


module.exports = model('card', cardSchema);