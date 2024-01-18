const { getByEmailService } = require('../services/users.services');
const { passwordMatch } = require('../helpers/passwordHashing');
const jwt = require('jsonwebtoken');
const { jwtParams } = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler')

const login = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await getByEmailService(email);

        if (userExist && userExist.disabled) {
            return next(new ErrorHandler('Tu cuenta se encuentra deshabilitada', 400));
        }

        if (!userExist) {
            return next(new ErrorHandler('El email no se encuentra registrado', 400))
        };

        const passMatch = await passwordMatch(password, userExist.password);
        if (!passMatch) {
            return next(new ErrorHandler('El email o la contraseña son incorrectos', 400))
        };

        const payload = {
            _id: userExist._id,
            email: userExist.email,
            role: userExist.role,
        };
        const token = jwt.sign(payload, jwtParams.secret, {
            expiresIn: jwtParams.exporesIn || 120,
        });
        res.status(200).json(token);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

});

module.exports = {
    login,
};
