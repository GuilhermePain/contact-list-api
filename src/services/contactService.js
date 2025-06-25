import Contact from '../models/Contact.js';
import User from '../models/User.js';

const createContact = async (userId, data) => {
    try {
        const userExists = await User.findById(userId);

        if (!userExists) {
            throw new Error('Usuário não encontrado.');
        }

        const contact = new Contact({
            ...data,
            user: userId
        });

        const savedContact = await contact.save();

        return {
            message: 'Contato criado com sucesso!',
            contactId: savedContact._id
        };
    } catch (error) {
        console.log(error);

        throw new Error('Erro ao criar contato.');
    }
};

const getAllContacts = async () => {
    try {
        const contacts = await Contact.find().populate('user', 'name email').select('-__v -cretedAt -updatedAt').sort({ createdAt: -1 });

        return contacts;
    } catch (error) {
        throw new Error('Erro interno ao buscar contatos.');
    }
};

const updateContact = async (id, data) => {
    try {
        const contactUpdated = await Contact.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!contactUpdated) {
            throw new Error('Contato não encontrado');
        }

        return {
            message: 'Contato atualizado com sucesso!',
            contactId: contactUpdated._id
        };
    } catch (error) {
        throw new Error('Erro interno ao atualizar contato.');
    }
};

const deleteContact = async (id) => {
    try {
        const contactDeleted = await Contact.findByIdAndDelete(id);

        if (!contactDeleted) {
            throw new Error('Contato não encontrado');
        }

        return {
            message: 'Contato deletado com sucesso!'
        };
    } catch (error) {
        throw new Error('Erro interno ao deletar contato.');
    }
};

export default {
    createContact,
    getAllContacts,
    updateContact,
    deleteContact
};
