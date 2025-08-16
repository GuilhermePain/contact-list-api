import userService from './user.service.js';
import User from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants/jwt.constant.js'

const login = async ({ email, password }) => {
    const user = await userService.findUserByEmail(email);

    if (!user) {
        const error = new Error('E-mail ou senha incorretos.');
        error.statusCode = 404;
        throw error;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        const error = new Error('E-mail ou senha incorretos.');
        error.statusCode = 401;
        throw error;
    }

    // Gera o token
    const token = jwt.sign(
        { id: user._id },
        jwtConstants.jwtSecretKey,
        { expiresIn: '1d' }
    );

    return {
        message: 'Login realizado com sucesso!',
        access_token: token
    };
};

const profile = async (userId) => {
    const profile = await User.findById(userId).select('-password -__v -createdAt -updatedAt');

    if (!profile) {
        throw new Error('Perfil do usuário não encontrado.');
    }

    return profile;
};

export default {
    login,
    profile
};
