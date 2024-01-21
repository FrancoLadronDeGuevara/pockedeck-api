const { hashingPassword } = require('../helpers/passwordHashing');
const {
    getUsersService,
    getUserService,
    createUserService,
    editUserService,
    deleteUserService,
    getUsernameService,
} = require('../services/users.services');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const response = await getUsersService();
    if (response.length === 0) return res.status(404).json('No se encontraron usuarios');
    res.status(200).json(response);
};

const getUser = catchAsync(async (req, res) => {
    const user = await getUserService(req.user);
    res.status(200).json(user)
});

const createUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const userWithPassHash = await hashingPassword(payload);
    await createUserService(userWithPassHash);
    res.status(201).json('Usuario creado con exito');
});

const editUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const response = await editUserService(id, payload);
    if (response == null) return res.status(404).json('Usuario no encontrado');
    res.status(200).json(response);
});

const updateUser = catchAsync(async (req, res) => {
    const  { id } = req.params;
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
    
    if (payload.oldPassword){
        const isPasswordValid = await user.comparePassword(payload.oldPassword);
        if(!isPasswordValid) return res.status(400).json('La contraseña actual es incorrecta');
        if(payload.oldPassword == payload.newPassword) return res.status(400).json('La nueva contraseña debe ser diferente a la actual');
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
    getAllUsers,
    createUser,
    editUser,
    updateUser,
    getUser,
    deleteUser,
};
