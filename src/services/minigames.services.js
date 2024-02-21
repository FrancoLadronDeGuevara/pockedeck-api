const User = require("../models/user.model");

const getTopScores = async () => {
    topGuessPokemonScores = await User.find({}, 'username maxScoreGuessPokemon')
        .sort({ 'maxScoreGuessPokemon': -1 })
        .limit(5);

    const topFlapHunterScores = await User.find({}, 'username maxScoreFlapHunter')
        .sort({ 'maxScoreFlapHunter': -1 })
        .limit(5);

    return { topGuessPokemonScores, topFlapHunterScores };
}

module.exports = {
    getTopScores
}