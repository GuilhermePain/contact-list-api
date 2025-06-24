import User from "../models/User.js";
import bcrypt from 'bcrypt';

const createUser = async (data) => {

    try {
        const user = new User(data);

        const userCreated = await user.save();

        return { message: 'Usuário criado com sucesso', userId: userCreated._id }

    } catch (error) {
        throw new Error('Erro interno ao criar usuário.');
    }

};

const findUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password -__v -createdAt -updatedAt');

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;

    } catch (error) {
        throw new Error('Erro interno ao buscar usuário.');
    }
};

const findUserByEmail = async (email) => {

    try {
        const user = await User.findOne({ email });

        return user;

    } catch (error) {
        throw new Error('Erro ao buscar usuário por email.');
    }
};

const updateUser = async (id, data) => {
    try {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }

        const userUpdated = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!userUpdated) {
            throw new Error('Usuário não encontrado.');
        }

        return {
            message: 'Usuário atualizado com sucesso.',
            userId: userUpdated._id
        }
    } catch (error) {
        throw new Error('Erro ao atualizar usuário.');
    }
};

const deleteUser = async (id) => {

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new Error('Usuário não encontrado');
        }

        return { message: 'Usuário deletado com sucesso!' }
    } catch (error) {
        throw new Error('Erro ao deletar usuário.');
    }

};

export default {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
}
