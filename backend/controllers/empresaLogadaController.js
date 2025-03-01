const db = require('../config/database'); // Conectando com a configuração do banco

// Função para obter a empresa associada ao usuário
const getEmpresaLogada = async (req, res) => {
  const email = req.query.email; // Obtém o email da query string

  try {
    // Consulta para buscar o usuário pelo email
    db.query('SELECT loja FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Erro ao buscar a empresa:', err);
        return res.status(500).json({ error: 'Erro ao buscar empresa' });
      }

      // Verifica se o usuário foi encontrado
      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Retorna o nome da loja do usuário
      const loja = results[0].loja;
      return res.json({ loja });
    });
  } catch (error) {
    console.error('Erro inesperado ao buscar empresa:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar empresa' });
  }
};

module.exports = { getEmpresaLogada };
