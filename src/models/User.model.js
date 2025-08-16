import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'E-mail inválido']
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = model('User', UserSchema);
export default User;
