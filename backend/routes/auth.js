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

    // Verifica se a senha fornecida corresponde à senha armazenada
    if (user.senha === password) {
      // Senha correta
      console.log('Senha correta para o usuário:', email);  // Log de senha correta
      return res.json({ message: 'Login realizado com sucesso!' });
    } else {
      // Senha incorreta
      console.log('Senha incorreta para o usuário:', email);  // Log de senha incorreta
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
  });
});

module.exports = router;
