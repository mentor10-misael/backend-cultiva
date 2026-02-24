const express = require("express");
const router = express.Router();
const controller = require("./centroCusto.controller");

router.post("/centro-custo", controller.criar);
router.get("/centro-custo", controller.listar);
router.delete("/centro-Custo/:id", controller.deletar);

module.exports = router;
