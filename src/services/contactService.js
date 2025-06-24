import Contact from '../models/Contact.js';

const createContact = async (data) => {
    try {
        const contact = new Contact(data);

        const savedContact = await contact.save();

        return {
            message: 'Contato criado com sucesso!',
            contactId: savedContact._id
        };
    } catch (error) {
        throw new Error('Erro interno ao criar contato.');
    }
};

const getAllContacts = async () => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

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
