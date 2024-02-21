const { getByPokedexNumberService } = require("../services/cards.services");
const { getTopScores } = require("../services/minigames.services");
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
            user.scoreGuessPokemon += 1;
            if(user.scoreGuessPokemon > user.maxScoreGuessPokemon){
                user.maxScoreGuessPokemon = user.scoreGuessPokemon
            }
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

        user.scoreGuessPokemon = 0;

        await user.save()
        return res.status(200).json(user.scoreGuessPokemon);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const getRanking = catchAsync(async (req, res, next) => {
    try {
        const topScores = await getTopScores();

        return res.status(200).json(topScores)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

module.exports = {
    getGuessPokemonCoins,
    resetUserScore,
    getRanking
}