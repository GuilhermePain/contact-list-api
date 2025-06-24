require('dotenv').config();

const express = require('express');
const connectDatabase = require('./config/database');
const app = express();
const port = process.env.PORT;
const contactRoutes = require('./routes/contactRoutes');

app.use(express.json());

connectDatabase();

app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
