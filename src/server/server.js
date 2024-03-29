const express = require('express');
const app = express();
require('dotenv').config();
require('../dbConnection/dbConnection');
const { serverConfig } = require('../config/config');
const port = serverConfig.port || 8000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandlerMiddleware = require('../middlewares/errorHandler');

const whitelist = ['http://localhost:5173', 'https://pokedeck-game.vercel.app', 'https://dashboard.uptimerobot.com/monitors/796504068'];
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acceso CORS no permitido'));
      }
    },
    credentials: true
  }));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//routes
const userRoutes = require('../routes/users.routes');
const cardsRoutes = require('../routes/cards.routes');
const chestsRoutes = require('../routes/chests.routes');
const minigamesRoutes = require('../routes/minigames.routes');

//useRoutes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardsRoutes);
app.use('/api/chests', chestsRoutes);
app.use('/api/minigames', minigamesRoutes);

//middleware error handler
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
