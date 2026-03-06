const express = require("express");
const { criar } = require("./evento.controller");

const router = express.Router();

router.post("/", criar);

module.exports = router;

