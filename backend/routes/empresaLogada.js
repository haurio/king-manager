const express = require('express');
const { getEmpresaLogada } = require('../controllers/empresaLogadaController');
const router = express.Router();

// Definir a rota para pegar a empresa associada ao usuário
router.get('/', getEmpresaLogada);

module.exports = router;
