const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/api/auth/register', (req, res) => {
  const { nome, email, senha, telefone, cargo, loja } = req.body;

  if (!nome || !email || !senha || !telefone || !cargo || !loja) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  // Verificar se o email já está cadastrado
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar usuário' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criptografar a senha' });
      }

      // Inserir o novo usuário no banco de dados
      const query = 'INSERT INTO users (nome, email, senha, telefone, cargo, loja) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [nome, email, hashedPassword, telefone, cargo, loja], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      });
    });
  });
});

module.exports = router;
