import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido']
    },
    phone: {
        type: String,
        required: true,
        match: [/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Telefone inválido']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'E-mail inválido']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Contact = model('Contact', contactSchema);
export default Contact;