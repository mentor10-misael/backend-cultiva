const prisma = require("../../prisma/client");

async function listarAgricultores() {
  return await prisma.agricultor.findMany();
}

async function criarCentroCusto(data) {
  const { nome, descricao, agricultorId } = data;

  if (!nome) {
    throw new Error("Nome é obrigatório");
  }

  return await prisma.centroCusto.create({
    data: {
      nome,
      descricao,
      agricultorId
    }
  });
}

async function listarCentroCusto() {
  return await prisma.centroCusto.findMany({
    include: {
      agricultor: true
    }
  });
}

module.exports = {
  listarAgricultores,
  criarCentroCusto,
  listarCentroCusto
};
