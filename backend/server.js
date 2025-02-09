const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth'); // Corrigido para importar corretamente
require('dotenv').config(); // Carregar variáveis de ambiente

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Usando as rotas de autenticação
app.use('/api/auth', authRouter); // Corrigido para manter o endpoint correto

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
