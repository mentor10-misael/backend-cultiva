const MovimentacaoService = require('./movimentacao.service');
const { syncSchema } = require('./movimentacao.schema'); // Importa a regra

class MovimentacaoController {
  async sync(req, res) {
    try {
      // O parse() verifica se os dados do req.body seguem a regra do Zod
      // Se algo estiver errado, ele pula direto para o catch(error)
      const dadosValidados = syncSchema.parse(req.body);

      const resultados = await MovimentacaoService.sincronizar(dadosValidados);
      
      return res.status(200).json({
        message: 'Sincronização concluída!',
        quantidade: resultados.length,
      });
} catch (error) {
  if (error.name === "ZodError") {
    // Isso vai te mostrar no VS Code exatamente qual campo falhou
    return res.status(400).json({ 
      error: "Falha na validação", 
      detalhes: error.errors 
    });
  }
  console.error(error);
  return res.status(500).json({ error: 'Erro interno.' });
}
  }

  async list(req, res) {
    try {
      const lista = await MovimentacaoService.listarTudo();
      return res.status(200).json(lista);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar movimentações.' });
    }
  }
}

module.exports = new MovimentacaoController();