const User = require('../models/user.model');

const getUsersService = async () => {
    return User.find({});
};

const getByEmailService = async (email) => {
    return User.findOne({ email });
};

const getByIdService = async (id) => {
    return User.findById(id);
};

const createUserService = async (payload) => {
    const newUser = new User(payload);
    return await newUser.save();
};

const editUserService = async (id, payload) => {
    const options = {
        new: true,
    };

    return await User.findByIdAndUpdate(id, payload, options);
};

const deleteUserService = async (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    getUsersService,
    getByIdService,
    createUserService,
    editUserService,
    deleteUserService,
    getByEmailService,
};
