import { configDotenv } from 'dotenv';
import express, { json } from 'express';
import connectDatabase from './config/database.config.js';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

configDotenv();

app.use(cors({
  origin: process.env.ORIGIN_CLIENT_URL,
  credentials: true
}));

app.use(json());

await connectDatabase();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
