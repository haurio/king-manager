const express = require('express');
const cors = require('cors');
const { router: authRouter } = require('./routes/auth'); // Importa as rotas de autenticação
const db = require('./db'); // Conexão com o banco de dados

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Usando as rotas de autenticação
app.use('/auth', authRouter);

// Outros endpoints que podem precisar de autenticação
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) res.status(500).json({ error: 'Erro ao buscar usuários' });
    else res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
