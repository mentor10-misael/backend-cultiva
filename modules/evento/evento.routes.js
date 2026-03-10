const express = require("express");
const { criar, listar, atualizarStatus } = require("./evento.controller");

const router = express.Router();

router.post("/", criar);
router.get("/", listar);
router.patch("/:id/status", atualizarStatus);

module.exports = router;

