const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Conexão com o banco de dados

const router = express.Router();

// Rota para autenticar o usuário
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e senha foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // Busca o usuário no banco de dados pelo email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Erro no servidor.' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secreta_chave',
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login bem-sucedido!', token });
    });
  });
});

module.exports = router;
