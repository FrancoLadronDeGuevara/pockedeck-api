const { hashingPassword, passwordMatch } = require('../helpers/passwordHashing');
const {
    getUsersService,
    getUserService,
    createUserService,
    editUserService,
    deleteUserService,
    getUsernameService,
    getByEmailService,
    getUserDeckService,
} = require('../services/users.services');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler');
const sendToken = require('../utils/jwtToken');
const { getByPokedexNumberService } = require('../services/cards.services');

const createUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const userWithPassHash = await hashingPassword(payload);
    await createUserService(userWithPassHash);
    res.status(201).json('Usuario creado con exito');
});

const loginUser = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await getByEmailService(email);

        if (user && user.disabled) {
            return next(new ErrorHandler('Tu cuenta se encuentra deshabilitada', 400));
        }

        if (!user) {
            return next(new ErrorHandler('El email no se encuentra registrado', 400))
        };

        const passMatch = await passwordMatch(password, user.password);
        if (!passMatch) {
            return next(new ErrorHandler('El email o la contraseña son incorrectos', 400))
        };

        sendToken(user, 201, res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const logoutUser = catchAsync(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({
            success: true,
            message: "Cerraste sesion con exito!",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const getUser = catchAsync(async (req, res, next) => {
    try {
        const user = await getUserService(req.user.id);

        if (!user) {
            return next(new ErrorHandler("El usuario no existe", 400));
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

const getUserDeck = catchAsync(async (req, res, next) => {
    try {
        const user = await getUserDeckService(req.user.id);

        if (!user) {
            return next(new ErrorHandler("Usuario no encontrado", 400));
        }

        res.status(200).json(user.userDeck);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const getCoins = catchAsync( async (req, res, next) => {
    try {
        const payload = req.body;

        const user = await getUserService(req.user.id);
        const pokemon = await getByPokedexNumberService(payload.id)

        if (!user) {
            return next(new ErrorHandler("El usuario no existe", 400));
        }
        

        if (payload.pokemonName.toLowerCase() === pokemon.name.toLowerCase()) {
            user.coins += 10;
            await user.save(); 
            return res.status(200).json(user.coins);
        } else {
            return res.status(400).json({ message: '¡Lo siento! No has ganado monedas, inténtalo de nuevo.' });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})


const getAllUsers = async (req, res, next) => {
    try {
        const response = await getUsersService();
        if (response.length === 0) return next(new ErrorHandler("No se encontraron usuarios", 404));
        res.status(201).json(response);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

const editUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const response = await editUserService(id, payload);
    if (response == null) return res.status(404).json('Usuario no encontrado');
    res.status(200).json(response);
});

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const user = await getUserService(id);

    if (payload.avatar) {
        user.avatar.url = payload.avatar.url
    }

    if (payload.username) {
        const existingUser = await getUsernameService(payload.username);
        if (existingUser) {
            return res.status(400).json('El nombre de usuario ya se encuentra en uso');
        }
        user.username = payload.username;
    }

    if (payload.oldPassword) {
        const isPasswordValid = await user.comparePassword(payload.oldPassword);
        if (!isPasswordValid) return res.status(400).json('La contraseña actual es incorrecta');
        if (payload.oldPassword == payload.newPassword) return res.status(400).json('La nueva contraseña debe ser diferente a la actual');
        user.password = await bcrypt.hash(payload.newPassword, 10);

    }

    const response = await editUserService(id, user);
    if (response == null) return res.status(404).json('Usuario no encontrado');
    res.status(200).json(response);
})

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await deleteUserService(id);
    if (response == null) return res.status(404).json('Usuario no encontrado');
    res.status(200).json(response);
});

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    getUserDeck,
    getCoins,
    getAllUsers,
    editUser,
    updateUser,
    deleteUser,
};
