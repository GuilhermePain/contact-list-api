import Contact from '../models/Contact.model.js';
import User from '../models/User.model.js';

const createContact = async (userId, data) => {
    const userExists = await User.findById(userId);

    if (!userExists) {
        const error = new Error('Usuário não encontrado.');
        error.statusCode = 404;
        throw error;
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
};

const getAllContactsByUserId = async (userId) => {
    const contacts = await Contact.find({ user: userId }).populate('user', 'name email').select('-__v -cretedAt -updatedAt').sort({ createdAt: -1 });

    return contacts;
};

const updateContact = async (id, data) => {
    const contactUpdated = await Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    if (!contactUpdated) {
        const error = new Error('Contato não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    return {
        message: 'Contato atualizado com sucesso!',
        contactId: contactUpdated._id
    };
};

const deleteContact = async (id) => {
    const contactDeleted = await Contact.findByIdAndDelete(id);

    if (!contactDeleted) {
        const error = new Error('Contato não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    return {
        message: 'Contato deletado com sucesso!'
    };
};

export default {
    createContact,
    getAllContactsByUserId,
    updateContact,
    deleteContact
};
