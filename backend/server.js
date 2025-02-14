const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importa os módulos de loja e cargo
const loja = require('./routes/loja');  // Certifique-se que o arquivo loja.js está correto
const cargo = require('./routes/cargo'); // Agora importando corretamente o arquivo cargo.js

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

// Rota para obter todos os cargos
app.get('/api/cargos', (req, res) => {
  cargo.getCargos((err, cargos) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar cargos' });
    } else {
      res.json(cargos);  // Retorna os cargos como JSON
    }
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
