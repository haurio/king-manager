const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loja = require('./routes/loja');  // Corrigir o caminho para './routes/loja'

const app = express();

// Middleware para permitir requisições de outros domínios (necessário para o Angular)
app.use(cors());

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para obter todas as empresas
app.get('/api/empresas', (req, res) => {
  loja.getEmpresas((err, empresas) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar empresas' });
    } else {
      res.json(empresas);  // Retorna as empresas como JSON
    }
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
