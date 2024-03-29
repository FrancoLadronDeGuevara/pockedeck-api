const User = require('../models/user.model');

const getUsersService = async () => {
    return User.find({});
};

const getByEmailService = async (email) => {
    return User.findOne({ email });
};

const getUserService = async (id) => {
    return User.findById(id);
};

const getUserDeckService = async (id) => {
    return User.findById(id)
        .populate('userDeck');
}

const getUsernameService = async (username) => {
    return User.findOne({ username })
}

const getUserProfileService = async (username) => {
    return User.findOne({ username })
        .populate('userDeck');
}

const createUserService = async (payload) => {
    const newUser = new User(payload);
    const savedUser = await newUser.save();
    return savedUser;
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
    createUserService,
    getUsersService,
    getUserService,
    getUserDeckService,
    editUserService,
    deleteUserService,
    getByEmailService,
    getUsernameService,
    getUserProfileService
};
