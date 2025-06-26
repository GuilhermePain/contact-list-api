import { configDotenv } from 'dotenv';
import express, { json } from 'express';
import connectDatabase from './config/database.config.js';
const app = express();
const port = process.env.PORT;
import routes from './routes/index.js';

configDotenv();

app.use(json());

await connectDatabase();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
