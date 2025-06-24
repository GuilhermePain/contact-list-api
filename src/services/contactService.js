const Contact = require('../models/Contact');

const createContact = async (data) => {
    try {
        const contact = new Contact(data);
        const savedContact = await contact.save();
        return { contactId: savedContact._id };
    } catch (error) {
        throw new Error('Houve um erro interno ao criar contato.');
    }
};

module.exports = createContactService;
