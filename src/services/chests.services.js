const Chest = require('../models/chest.model');

const getChestsService = async () =>{
    return Chest.find({});
}

const getChestByIdService = async (id) => {
    return Chest.findById(id);
};

const createChestService = async (payload) => {
    const newChest = new Chest(payload);
    return await newChest.save();
};

const editChestService = async (id, payload) => {
    const options = {
        new: true,
    };

    return await Chest.findByIdAndUpdate(id, payload, options);
};

const deleteChestService = async (id) => {
    return Chest.findByIdAndDelete(id);
};

module.exports = {
    getChestsService,
    getChestByIdService,
    createChestService,
    editChestService,
    deleteChestService,
};
