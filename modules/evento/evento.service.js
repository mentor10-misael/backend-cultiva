const prisma = require("../../prisma/client");

const { getMoonPhase } = require("../../utils/moon");

const AGRICULTOR_TESTE = "145837fc-ecec-497e-9ef5-7d8c5c4639cc";

const criarEvento = async (dados) => {
  const evento = await prisma.evento.create({
    data: {
      titulo: dados.titulo,
      data: dados.data,
      tipo: dados.tipo,
      agricultorId: AGRICULTOR_TESTE,
    },
  });

  return evento;
};

const listarEventos = async (mes, ano) => {

  const where = {
    agricultorId: AGRICULTOR_TESTE,
  };

  if (mes && ano) {
    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1);

    where.data = {
      gte: inicio,
      lt: fim,
    };
  }

  const eventos = await prisma.evento.findMany({
    where,
    orderBy: {
      data: "asc",
    },
  });

 const eventosComLua = eventos.map((evento) => ({
    ...evento,
    faseLua: getMoonPhase(evento.data),
  }));

  return eventosComLua;       
 };

const atualizarStatusEvento = async (id, concluido) => {

  const evento = await prisma.evento.updateMany({
    where: { id },
    data: {concluido },
  });

  return evento;
};

module.exports = {
  criarEvento,
  listarEventos,
  atualizarStatusEvento,
};