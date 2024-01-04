const { hashingPassword } = require('../helpers/passwordHashing');
const {
    getUsersService,
    getByIdService,
    createUserService,
    editUserService,
    deleteUserService,
} = require('../services/users.services');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = async (req, res) => {
    const response = await getUsersService();
    if (response.length === 0) return res.status(404).json('No se encontraron usuarios');
    res.status(200).json(response);
};

const getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await getByIdService(id);
    res.status(200).json(response);
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
    getById,
    deleteUser,
};
