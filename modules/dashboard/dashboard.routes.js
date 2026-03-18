const express = require("express");
const router = express.Router();
const { listarTotais } = require("./dashboard.controller");

router.get("/totais", listarTotais);

module.exports = router;
