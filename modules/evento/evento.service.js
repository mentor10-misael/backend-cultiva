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

module.exports = { criarEvento };
