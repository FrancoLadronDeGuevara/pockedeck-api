const express = require('express');
const app = express();
require('dotenv').config();
require('../dbConnection/dbConnection');
const { serverConfig } = require('../config/config');
const port = serverConfig.port || 8000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require('../middlewares/errorHandler');


const whitelist = ['http://localhost:5173'];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(console.error(`Not allowed by CORS -> ${origin}`));
        }
    },
};

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
const userRoutes = require('../routes/users.routes');
const cardsRoutes = require('../routes/cards.routes')
const chestsRoutes = require('../routes/chests.routes')

//useRoutes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardsRoutes);
app.use('/api/chests', chestsRoutes);


//middleware error handler
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Estamos escuchando el puerto ${port}`);
});
