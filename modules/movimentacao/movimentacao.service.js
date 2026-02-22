const prisma = require('../../db');

class MovimentacaoService {
  async sincronizar(dados) {
    // Garante que os dados sejam um array
    const movimentacoes = Array.isArray(dados) ? dados : [dados];

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