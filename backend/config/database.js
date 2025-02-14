const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'grupo_alvim_system',
  waitForConnections: true,
  connectionLimit: 10, // Limita o número de conexões simultâneas
  queueLimit: 0 // Sem limite para a fila de conexões
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados grupo_alvim_system');

    // Teste simples para verificar a conexão
    db.query('SELECT 1 + 1 AS result', (err, results) => {
      if (err) {
        console.error('Erro na consulta:', err);
      } else {
        console.log('Consulta bem-sucedida:', results);
      }
    });
  }
});

module.exports = db;
