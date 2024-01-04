const {Schema, model} = require('mongoose');

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

module.exports = model('chest', chestSchema)