const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Conexão com o banco de dados

const router = express.Router();

// Rota para autenticar o usuário
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  console.log('Requisição recebida:', req.body);  // Log do corpo da requisição

  // Verifica se o email e senha foram fornecidos
  if (!email || !senha) {
    console.log('Faltando email ou senha');  // Log de erro
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // Busca o usuário no banco de dados pelo email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ error: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const user = results[0];

    // Compara a senha fornecida com a senha do banco (utilizando bcrypt)
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err);
        return res.status(500).json({ error: 'Erro no servidor.' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta.' });
      }

      // Gera um token JWT para o usuário
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secreta_chave', // Use uma variável de ambiente para a chave secreta
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      res.json({ message: 'Login bem-sucedido!', token });
    });
  });
});

module.exports = router;
