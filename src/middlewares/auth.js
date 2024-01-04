const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { jwtParams } = require('../config/config');

const validateToken = catchAsync(async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) return res.status(401).json('Token inexistente');
    jwt.verify(token, jwtParams.secret, (error, decoded) => {
        if (error) return res.status(401).json('Token invalido');
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
    validateToken,
    validateRole,
};