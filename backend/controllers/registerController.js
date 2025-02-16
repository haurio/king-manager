const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');  // Certifique-se de que o caminho para o banco de dados está correto
const router = express.Router();  // Inicializando o router

// Rota para registrar um novo usuário
router.post('/register', (req, res) => {
  const { nome, email, senha, loja, cargo, telefone } = req.body;

  // Validando os dados
  if (!nome || !email || !senha || !loja || !cargo || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  // Verificar se o email já está registrado
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar o email' });
    }

    // Se o email já estiver registrado
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email já está registrado!' });
    }

    // Hash da senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao hashiar a senha' });
      }

      // Inserir o usuário no banco de dados
      const query = `INSERT INTO users (nome, email, senha, loja, cargo, telefone)
                     VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(query, [nome, email, hashedPassword, loja, cargo, telefone], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao registrar o usuário' });
        }

        // Sucesso no registro
        return res.status(200).json({ message: 'Usuário registrado com sucesso!' });
      });
    });
  });
});

module.exports = router;  // Exportando o router para ser usado no server.js
