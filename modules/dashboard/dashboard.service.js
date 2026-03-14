import prisma from "../../prisma/client.js";

export const listarTotaisDashboard = async (mes, ano) => {

  mes = Number(mes);
  ano = Number(ano);

  const inicioMes = new Date(ano, mes - 1, 1);
  const fimMes = new Date(ano, mes, 0, 23, 59, 59);

  const [totalReceitas, totalDespesas] = await Promise.all([

    prisma.movimentacao.aggregate({
      where: {
        tipo: "RECEITA",
        data: {
          gte: inicioMes,
          lte: fimMes
        }
      },
      _sum: {
        valor: true
      }
    }),

    prisma.movimentacao.aggregate({
      where: {
        tipo: "DESPESA",
        data: {
          gte: inicioMes,
          lte: fimMes
        }
      },
      _sum: {
        valor: true
      }
    })

  ]);

  return {
    receitas: totalReceitas._sum.valor || 0,
    despesas: totalDespesas._sum.valor || 0
  };
};
