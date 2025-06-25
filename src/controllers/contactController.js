import contactService from '../services/contactService.js';

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
        const user = req.user;
        
        const result = await contactService.createContact(user, req.body);

        return res.status(201).json(result);

    } catch (error) {
        if (error.message === 'Usuário não encontrado.') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar criar contato.' });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const result = await contactService.getAllContacts();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: 'Houve um erro interno ao tentar buscar todos os contatos.' });
    }
};

const updateContact = async (req, res) => {

    const contactId = req.params.id;
    const data = req.body;

    try {
        const result = await contactService.updateContact(contactId, data);

        return res.status(200).json(result);

    } catch (error) {
        if (error.message === 'Contato não encontrado') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar atualizar contato.' });
    }
};

const deletedContact = async (req, res) => {
    const contactId = req.params.id;

    try {
        const result = await contactService.deleteContact(contactId);

        return res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Contato não encontrado') {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Houve um erro interno ao tentar deletar contato.' });
    }

};

export default {
    createContact,
    getAllContacts,
    updateContact,
    deletedContact
};
