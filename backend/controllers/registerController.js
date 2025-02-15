// controllers/registerController.js
const express = require('express');
const { registerUser } = require('../routes/register_user');  // Certifique-se de que o caminho está correto
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', (req, res) => {
  const { nome, email, senha, loja, cargo, telefone } = req.body;

  // Validando os dados
  if (!nome || !email || !senha || !loja || !cargo || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  // Chama a função de registro do usuário
  registerUser({ nome, email, senha, loja, cargo, telefone }, (err, message) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ message: message });
  });
});

module.exports = router;  // Certifique-se de que você está exportando o router corretamente
