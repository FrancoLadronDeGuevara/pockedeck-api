const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio.'],
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ['admin', 'client'],
            default: 'client',
        },
        password: {
            type: String,
            required: [true, 'El password es obligatorio.'],
        },
        coins: {
            type: Number,
            default: 100,
        },
        userDeck: [{
            card: { 
                type: Schema.Types.ObjectId, 
                ref: 'Card' 
            },
            quantity: {
                type: Number,
                default: 0,
            },
        }],
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (!this.username) {
        this.username = 'user' + Math.floor(Math.random() * 1000000)
    }

    next();
});

module.exports = model('user', userSchema);
