export function validarCentroCusto(data) {
  if (!data.nome || data.nome.trim() === "") {
    throw new Error("Nome do centro de custo é obrigatório");
  }

  return {
    nome: data.nome.trim(),
    descricao: data.descricao || null,
  };
}
