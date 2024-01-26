const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { jwtParams } = require('../config/config');
const ErrorHandler = require('../utils/ErrorHandler');
const User = require('../models/user.model');

exports.isAuthenticated = catchAsync(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Por favor, inicia sesión primero", 401));
    }

    const decoded = jwt.verify(token, jwtParams.secret);

    req.user = await User.findById(decoded.id);

    next();
});

exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} no puedes acceder a estos recursos!`))
        };
        next();
    }
}

// exports.isAdmin = catchAsync((req, res, next) => {
//     const user = req.user;
//     if (user.role !== 'admin')
//         return next(new ErrorHandler(`${req.user.role} no puedes acceder a estos recursos!`))
//     next();
// });