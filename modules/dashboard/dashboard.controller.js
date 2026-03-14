const { listarTotaisDashboard } = require("./dashboard.service");

const listarTotais = async (req, res) => {
  try {
    const { mes, ano } = req.query;

    const dados = await listarTotaisDashboard(mes, ano);

    return res.json(dados);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarTotais
}; 