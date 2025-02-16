// controllers/registerController.js
router.post('/register', (req, res) => {
  const { nome, email, senha, loja, cargo, telefone } = req.body;

  // Validando os dados
  if (!nome || !email || !senha || !loja || !cargo || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  // Verificar se o email já está registrado
  const checkEmailQuery = 'SELECT * FROM Users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar o email' });
    }

    // Se o email já estiver registrado
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email já está registrado!' });  // Alteração aqui
    }

    // Hash da senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao hashiar a senha' });
      }

      // Inserir o usuário no banco de dados
      const query = `INSERT INTO Users (nome, email, senha, loja, cargo, telefone)
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
