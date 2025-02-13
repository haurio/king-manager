const express = require('express');
const cors = require('cors');
const db = require('./db');  // Conexão com o banco de dados
const bcrypt = require('bcrypt');  // Para verificar as senhas criptografadas

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Permite solicitações de origens diferentes

// Rota de login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // Verificar no banco de dados se o usuário existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const user = results[0];

    // Comparar a senha informada com a armazenada no banco
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao comparar senha' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      // Login bem-sucedido
      res.json({ message: 'Login bem-sucedido', user });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
