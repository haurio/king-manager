const db = require('../config/database');  // A conexão com o banco de dados

// Função para buscar todos os cargos
function getCargos(callback) {
  const query = 'SELECT nome_cargo FROM cargos';  // A consulta para buscar a coluna nome_cargo
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar cargos:', err);
      return callback(err, null);
    }
    return callback(null, results);  // Retorna os resultados da consulta
  });
}

module.exports = { getCargos };  // Exporta a função para ser usada no server.js
