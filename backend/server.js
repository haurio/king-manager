const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importa os módulos de loja, cargo, registro e autenticação
const loja = require('./routes/loja'); // Módulo de loja
const cargo = require('./routes/cargo'); // Módulo de cargo
const registerController = require('./controllers/registerController'); // Módulo de registro
const authRoutes = require('./routes/auth'); // Módulo de autenticação (novo)
const empresaLogadaRoutes = require('./routes/empresaLogada'); // Corrigido o nome da rota para 'empresaLogada.js'

const app = express();

// Middleware para permitir requisições de outros domínios (necessário para o Angular)
app.use(cors());

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para obter todas as empresas (via módulo de loja)
app.get('/api/empresas', (req, res) => {
  loja.getEmpresas((err, empresas) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
    return res.json(empresas); // Retorna as empresas como JSON
  });
});

// Rota para obter todos os cargos (via módulo de cargo)
app.get('/api/cargos', (req, res) => {
  cargo.getCargos((err, cargos) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cargos' });
    }
    return res.json(cargos); // Retorna os cargos como JSON
  });
});

// Rota para registrar um usuário (via controller de registro)
app.use('/api', registerController); // Integrando o controller de registro

// Rota de autenticação (login)
app.use('/api/auth', authRoutes); // Integrando a rota de autenticação

// Rota para empresa logada (ajustada para a rota correta)
app.use('/api/empresa-logada', empresaLogadaRoutes); // Corrigido para 'empresaLogada.js'

 // Inicia o servidor na porta configurada
const PORT = process.env.PORT || 3000; // Porta configurável via variável de ambiente
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
