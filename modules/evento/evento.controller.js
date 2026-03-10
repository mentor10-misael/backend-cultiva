const { criarEvento, listarEventos, atualizarStatusEvento } = require("./evento.service");

const criar = async (req, res) => {
  try {
    const evento = await criarEvento(req.body);
    return res.status(201).json(evento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const { mes, ano } = req.query;

    const eventos = await listarEventos(Number(mes), Number(ano));

    return res.json(eventos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { concluido } = req.body;

    // validação do campo 'concluido'
    if (typeof concluido !== "boolean") {
      return res.status(400).json({
        error: "O campo 'concluido' deve ser true ou false",
      });
    }

    const evento = await atualizarStatusEvento(id, concluido);

    return res.json(evento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { criar, listar, atualizarStatus };
