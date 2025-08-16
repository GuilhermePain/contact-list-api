import authService from '../services/auth.service.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Senha é obrigatória.' });
    }

    try {
        const result = await authService.login({ email, password });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar fazer login.'
        });
    }
};

const profile = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await authService.profile(userId);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar buscar perfil do usuário usuário.'
        });
    }
};

export default {
    login,
    profile
};
