const { criarEvento } = require("./evento.service");

const criar = async (req, res) => {
  try {
    const evento = await criarEvento(req.body);
    return res.status(201).json(evento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { criar };