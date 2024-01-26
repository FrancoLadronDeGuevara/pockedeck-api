require('dotenv').config();

const serverConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUriMongo: process.env.DB_URI,
};

const jwtParams = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.TOKEN_EXPIRES_IN,
};

module.exports = {
    serverConfig,
    jwtParams,
};
