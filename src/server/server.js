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

app.use(
  cors({
    origin: 'https://pokedeck-game.vercel.app',
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pokedeck-game.vercel.app');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

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
