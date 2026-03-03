const prisma = require("../../prisma/client");

async function listarAgricultores() {
  return await prisma.agricultor.findMany();
}

async function criarCentroCusto(data) {
  const { nome, descricao, agricultorId } = data;

  if (!nome) {
    throw new Error("Nome é obrigatório");
  }

  //Verifica a duplicidade
const centroExistente = await prisma.centroCusto.findFirst({
    where: {
      nome: nome,
      agricultorId: agricultorId,
      ativo: true
    }
  });

  if (centroExistente) {
    throw new Error("Já existe um centro de custo com esse nome para este agricultor.");
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
    where: {
      ativo: true
    },
    include: {
      agricultor: true
    }
  });
}

// SoftDelete //
async function deletarCentroCusto(id) {
  return await prisma.centroCusto.update({
    where: { id },
    data: {
      ativo: false,
      deletedAt: new Date()
    }
  });
}

module.exports = {
  listarAgricultores,
  criarCentroCusto,
  listarCentroCusto,
  deletarCentroCusto
};
