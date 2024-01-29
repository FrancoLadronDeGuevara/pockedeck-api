const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        avatar: {
            public_id: {
                type: String,
                default: 'avatars/b2sqa60qxr6w7muy24xo'
            },
            url: {
                type: String,
                default: 'https://res.cloudinary.com/dnlvoza12/image/upload/v1705120529/avatars/b2sqa60qxr6w7muy24xo.png'
            },
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
                default: 1,
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

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model('user', userSchema);
