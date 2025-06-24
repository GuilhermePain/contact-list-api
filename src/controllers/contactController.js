const createContactService = require('../services/createContactService');

const createContact = async (req, res) => {
    try {
        const result = await createContactService(req.body);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar contato:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContact,
};
