import userService from '../services/user.service.js';

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await userService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        const result = await userService.createUser(req.body);
        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar criar usuário.'
        });
    }
};

const findUserById = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await userService.findUserById(userId);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar buscar usuário.'
        });
    }
};

const updateUser = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const result = await userService.updateUser(userId, data);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar atualizar usuário.'
        });
    }
};

const deletedUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await userService.deleteUser(userId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar deletar usuário.'
        });
    }
};

export default {
    createUser,
    findUserById,
    updateUser,
    deletedUser
}