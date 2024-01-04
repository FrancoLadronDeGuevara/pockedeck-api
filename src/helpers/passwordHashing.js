const bcrypt = require('bcrypt');

const hashingPassword = async (user) => {
    const saltRounds = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, saltRounds);
    return user;
};

const passwordMatch = async (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
};

module.exports = {
    hashingPassword,
    passwordMatch,
};
