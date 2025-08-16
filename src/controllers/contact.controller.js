import contactService from '../services/contact.service.js';

const createContact = async (req, res) => {

    const { name, phone, email } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Nome é obrigatório.' });
    }

    if (!phone) {
        return res.status(400).json({ message: 'Telefone é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    try {
        const userId = req.user.id;

        const result = await contactService.createContact(userId, req.body);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Ocorreu um erro interno ao tentar criar contato.'
        });
    }
};

const getAllContactsByUserId = async (req, res) => {
    try {
        const userId = req.user.id

        const result = await contactService.getAllContactsByUserId(userId);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Houve um erro interno ao tentar buscar todos os contatos.'
        });
    }
};

const updateContact = async (req, res) => {

    const contactId = req.params.id;
    const data = req.body;

    try {
        const result = await contactService.updateContact(contactId, data);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Houve um erro interno ao tentar atualizar contato.'
        });
    }
};

const deletedContact = async (req, res) => {
    const contactId = req.params.id;

    try {
        const result = await contactService.deleteContact(contactId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Houve um erro interno ao tentar deletar contato.'
        });
    }

};

export default {
    createContact,
    getAllContactsByUserId,
    updateContact,
    deletedContact
};
