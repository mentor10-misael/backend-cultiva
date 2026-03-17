const express = require('express');
const router = express.Router();
const MovimentacaoController = require('./movimentacao.controller');

// Caminhos: POST /movimentacoes/sync e GET /movimentacoes
router.post('/sync', MovimentacaoController.sync);
router.get('/', MovimentacaoController.list);

module.exports = router;