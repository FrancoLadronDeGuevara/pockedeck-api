const mongoose = require('mongoose');
const { serverConfig } = require('../config/config');

const dbConn = async () => {
    try {
        await mongoose.connect(serverConfig.dbUriMongo);
        console.log('Conexion exitosa a DB');
    } catch (error) {
        console.log(error);
    }
};

dbConn();
