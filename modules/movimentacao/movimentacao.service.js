const prisma = require('../../prisma/client.js');

class MovimentacaoService {
  // 1. Recebe o agricultorIdLogado como segundo parâmetro
  async sincronizar(dados, agricultorIdLogado) {
    // Garante que os dados sejam um array
    const movimentacoes = Array.isArray(dados) ? dados : [dados];

    // 2. Extrai apenas os IDs únicos dos centros de custo enviados no array
    const centroCustoIds = [...new Set(movimentacoes.map(mov => mov.centroCustoId))];

    // 3. Consulta no banco quantos desses IDs pertencem ao agricultor logado
    const centrosValidos = await prisma.centroCusto.count({
      where: {
        id: { in: centroCustoIds },
        agricultorId: agricultorIdLogado 
      }
    });

    // 4. Bloqueia se enviarem um centro_custo_id de outro agricultor
    if (centrosValidos !== centroCustoIds.length) {
      throw new Error('FORBIDDEN_CENTRO_CUSTO');
    }

    // Se passou pela validação, segue com a transação
    return await prisma.$transaction(
      movimentacoes.map((mov) => {
        return prisma.movimentacao.upsert({
          where: { syncId: mov.syncId },
          update: {}, // Não altera nada se já existir (evita duplicidade offline)
          create: {
            syncId: mov.syncId,
            tipo: mov.tipo,
            valor: mov.valor,
            descricao: mov.descricao,
            dataMovimento: new Date(mov.dataMovimento),
            formaPagamento: mov.formaPagamento,
            entidade: mov.entidade,
            centroCustoId: mov.centroCustoId,
            agricultorId: mov.agricultorId, 
          },
        });
      })
    );
  }

  async listarTudo() {
    return await prisma.movimentacao.findMany({
      include: { CentroCusto: true },
      orderBy: { dataMovimento: 'desc' },
    });
  }
}

module.exports = new MovimentacaoService();