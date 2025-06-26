import userService from './user.service.js';
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

export default {
    login,
};
