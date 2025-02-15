// routes/register_user.js
const bcrypt = require('bcryptjs');
const db = require('../config/database'); // Certifique-se de que o caminho está correto

// Função para registrar um usuário
function registerUser({ nome, email, senha, loja, cargo, telefone }, callback) {
  // Verificar se o email já está registrado
  const checkEmailQuery = 'SELECT * FROM Users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return callback('Erro ao verificar o email', null);
    }

    // Se o email já estiver registrado
    if (results.length > 0) {
      return callback('Email já está registrado!', null);
    }

    // Hash da senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return callback('Erro ao hashiar a senha', null);
      }

      // Inserir o usuário no banco de dados
      const query = `INSERT INTO Users (nome, email, senha, loja, cargo, telefone)
                     VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(query, [nome, email, hashedPassword, loja, cargo, telefone], (err, result) => {
        if (err) {
          return callback('Erro ao registrar o usuário', null);
        }

        // Sucesso no registro
        return callback(null, 'Usuário registrado com sucesso!');
      });
    });
  });
}

module.exports = { registerUser };  // Exporta a função
