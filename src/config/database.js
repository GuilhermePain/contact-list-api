require('dotenv').config();
const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.URL_MONGODB);
        console.log('Conectado ao MongoDB com Mongoose!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;
