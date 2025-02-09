const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Conexão com o banco de dados

const router = require('express').Router();

// Função para login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email existe no banco de dados
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);  // Log de erro
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }

    if (results.length === 0) {
      console.log('Usuário não encontrado:', email);  // Log quando não encontrar o usuário
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const user = results[0]; // Usuário encontrado
    console.log('Usuário encontrado:', user.email);  // Log do usuário encontrado

    // Compara a senha fornecida com a senha armazenada (criptografada)
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senha:', err);  // Log de erro
        return res.status(500).json({ error: 'Erro ao comparar senha' });
      }

      if (!isMatch) {
        console.log('Senha incorreta para o usuário:', email);  // Log de senha incorreta
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      // Criação do token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },  // Use email para identificar o usuário
        process.env.JWT_SECRET, // Chave secreta
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      console.log('Token gerado para o usuário:', user.email);  // Log do token gerado

      // Retorna o token para o cliente
      res.json({ token });
    });
  });
});

module.exports = router;
