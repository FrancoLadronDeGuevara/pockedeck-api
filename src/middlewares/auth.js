const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { jwtParams } = require('../config/config');
const ErrorHandler = require('../utils/ErrorHandler');

const isAuthenticated = catchAsync(async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token){
        return next(new ErrorHandler('Token inexistente', 401))
    } 
    
    jwt.verify(token, jwtParams.secret, (error, decoded) => {
        if (error){
            return next(new ErrorHandler('Token invalido', 401))
        } 
        req.user = decoded;
        next();
    });
});

const validateRole = catchAsync((req, res, next) => {
    const user = req.user;
    if (user.role !== 'admin')
        return res.status(401).json('Usuario no autorizado');
    next();
});

module.exports = {
    isAuthenticated,
    validateRole,
};