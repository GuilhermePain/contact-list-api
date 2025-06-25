import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtConstants } from '../constants/jwtConstant.js';

configDotenv();

export const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Não autorizado.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token ausente.' });

    try {
        const decoded = jwt.verify(token, jwtConstants.jwtSecretKey);

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        req.user = decoded;
        
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error.message);
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
