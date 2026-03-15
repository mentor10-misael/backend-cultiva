const MovimentacaoService = require('./movimentacao.service');
const { syncSchema } = require('./movimentacao.schema'); // Importa a regra

class MovimentacaoController {
  async sync(req, res) {
    try {
      // 1. O parse() verifica se os dados do req.body seguem a regra do Zod
      const dadosValidados = syncSchema.parse(req.body);

      // 2. Garante que é um array para podermos pegar o ID facilmente
      const movimentacoesArray = Array.isArray(dadosValidados) ? dadosValidados : [dadosValidados];
      
      // 3. Define quem é o agricultor logado.
      // IMPORTANTE: O ideal é que venha do token JWT (ex: req.usuario.id).
      // Se ainda não tiver o middleware de auth rodando, ele usa o ID que veio no primeiro item do body como quebra-galho para você testar.
      const agricultorIdLogado = req.usuario?.id || movimentacoesArray[0].agricultorId;

      // 4. Passa os dados e o ID do usuário logado para o Service
      const resultados = await MovimentacaoService.sincronizar(dadosValidados, agricultorIdLogado);
      
      return res.status(200).json({
        message: 'Sincronização concluída!',
        quantidade: resultados.length,
      });

    } catch (error) {
      // Trata erros de validação do Zod (ex: faltou um campo obrigatório)
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Falha na validação", 
          detalhes: error.errors 
        });
      }

      // Trata o erro de segurança (IDOR) que criamos no Service
      if (error.message === 'FORBIDDEN_CENTRO_CUSTO') {
        return res.status(403).json({ 
          error: 'Acesso negado: Um ou mais Centros de Custo não pertencem a este agricultor.' 
        });
      }

      console.error(error);
      return res.status(500).json({ error: 'Erro interno ao sincronizar.' });
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