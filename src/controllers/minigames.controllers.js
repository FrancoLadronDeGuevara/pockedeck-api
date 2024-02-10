const { getByPokedexNumberService } = require("../services/cards.services");
const { getUserService } = require("../services/users.services");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/ErrorHandler");

const getGuessPokemonCoins = catchAsync(async (req, res, next) => {
    try {
        const payload = req.body;

        const user = await getUserService(req.user.id);
        const pokemon = await getByPokedexNumberService(payload.id)

        if (!user) {
            return next(new ErrorHandler("El usuario no existe", 400));
        }


        if (payload.pokemonName.toLowerCase() === pokemon.name.toLowerCase()) {
            user.coins += 10;
            user.score.scoreGuessPokemon += 1;
            await user.save();
            return res.status(200).json(user);
        } else {
            user.score.scoreGuessPokemon = 0;
            return res.status(400).json({ message: '¡Lo siento! No has ganado monedas, inténtalo de nuevo.' });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const resetUserScore = catchAsync(async (req, res, next) => {
    try {
        const user = await getUserService(req.user.id);

        if (!user) {
            return next(new ErrorHandler("El usuario no existe", 400));
        }

        user.score.scoreGuessPokemon = 0;

        await user.save()
        return res.status(200).json(user.score.scoreGuessPokemon);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = {
    getGuessPokemonCoins,
    resetUserScore
}