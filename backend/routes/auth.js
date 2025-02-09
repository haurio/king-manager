// routes/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Conexão com o banco de dados

const router = require('express').Router();

// Função para login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe no banco de dados
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const user = results[0]; // Usuário encontrado

    // Compara a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao comparar senha' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      // Criação do token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET, // Chave secreta
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      // Retorna o token para o cliente
      res.json({ token });
    });
  });
});

module.exports = router;
