const prisma = require("../../prisma/client");

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
  
  const inicio = new Date(ano, mes - 1, 1);
  const fim = new Date(ano, mes, 1);
  
  const eventos = await prisma.evento.findMany({
    where: {
      agricultorId: AGRICULTOR_TESTE,
      data: {
        gte: inicio,
        it: fim,
      },
    },
    orderBy: {
      data: "asc",
    },
  });

  return eventos
};

const atualizarStatusEvento = async (id, concluido) => {
  const evento = await prisma.evento.update({
    where: {
      id: id,
    },
    data: {
      concluido: concluido,
    },
  });

  return evento;
}

module.exports = { 
  criarEvento,
  listarEventos,
  atualizarStatusEvento,
};
