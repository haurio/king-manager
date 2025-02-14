const db = require('../config/database');  // A conexão com o banco de dados

// Função para buscar todas as empresas
function getEmpresas(callback) {
  const query = 'SELECT nome_fantasia FROM empresas';  // A consulta para buscar a coluna nome_fantasia
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar empresas:', err);
      return callback(err, null);
    }
    return callback(null, results);  // Retorna os resultados da consulta
  });
}

module.exports = { getEmpresas };  // Exporta a função para ser usada no server.js
