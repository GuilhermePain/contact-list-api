import { configDotenv } from 'dotenv';
import { connect } from 'mongoose';

configDotenv();

async function connectDatabase() {
    try {
        await connect(process.env.URL_MONGODB);
        console.log('Conectado ao MongoDB com Mongoose!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1);
    }
}

export default connectDatabase;
