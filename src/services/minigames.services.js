const User = require("../models/user.model");

const getTopScores = async () => {
    const topGuessPokemonScores = await User.find({}, 'username maxScoreGuessPokemon')
        .sort({ 'maxScoreGuessPokemon': -1 })
        .limit(5);

    const topFlapHaunterScores = await User.find({}, 'username maxScoreFlapHaunter')
        .sort({ 'maxScoreFlapHaunter': -1 })
        .limit(5);

    return { topGuessPokemonScores, topFlapHaunterScores };
}

module.exports = {
    getTopScores
}