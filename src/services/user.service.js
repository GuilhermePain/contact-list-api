import User from "../models/User.model.js";
import bcrypt from 'bcrypt';

const createUser = async (data) => {
    const user = new User(data);

    const userCreated = await user.save();

    return { message: 'Usuário criado com sucesso', userId: userCreated._id }

};

const findUserById = async (id) => {
    const user = await User.findById(id).select('-password -__v -createdAt -updatedAt');

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    return user;

};

const findUserByEmail = async (email) => {

    const user = await User.findOne({ email });

    return user;
};

const updateUser = async (id, data) => {
    if (!data) {
        const error = new Error('Dados de atualização não informados.');
        error.statusCode = 400;
        throw error;
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
    }

    const userUpdated = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    if (!userUpdated) {
        const error = new Error('Usuário não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    return {
        message: 'Usuário atualizado com sucesso.',
        userId: userUpdated._id
    }
};

const deleteUser = async (id) => {

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        const error = new Error('Usuário não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    return { message: 'Usuário deletado com sucesso!' }

};

export default {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
}
