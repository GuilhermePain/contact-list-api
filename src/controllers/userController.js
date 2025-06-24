import userService from '../services/userService.js';

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    try {
        const existingUser = await userService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        const result = await userService.createUser(req.body);
        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno ao tentar criar usuário.' });
    }
};

const findUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await userService.findUserById(userId);

        return res.status(200).json(result);

    } catch (error) {
        if (error.message === 'Usuário não encontrado.') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar atualizar usuário.' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        const result = await userService.updateUser(userId, data);

        return res.status(200).json(result);

    } catch (error) {
        if (error.message === 'Usuário não encontrado.') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar atualizar usuário.' });
    }
};

const deletedUser = async (req, res) => {

    try {

        const userId = req.params.id;

        const result = await userService.deleteUser(userId);

        return res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Usuário não encontrado.') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar deletar usuário.' });
    }
};

export default {
    createUser,
    findUserById,
    updateUser,
    deletedUser
}