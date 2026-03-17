const service = require("./centroCusto.service");

async function criar(req, res) {
  console.log(String("Chegou aqui!!!"))
  try {
    // TEMPORÁRIO — depois virá do login
    const agricultorId = "145837fc-ecec-497e-9ef5-7d8c5c4639cc";

    const centro = await service.criarCentroCusto({
      ...req.body,
      agricultorId
    });

    res.status(201).json(centro);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listar(req, res) {
  try {
    const data = await service.listarCentroCusto();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao buscar centros de custo"
    });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;

    const centro = await service.deletarCentroCusto(id);

    res.json(centro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
   criar,
   listar,
   deletar
};
