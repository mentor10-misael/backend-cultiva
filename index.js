require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pg = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const centroCustoRoutes = require("./modules/centro-custo/centroCusto.routes");


// Redundant local prisma initialization removed - using centralized client instead.

app.get("/", (req, res) => {
  console.log('GET / request received');
  res.json({ message: "Backend Cultiva API is running" });
});

app.use(centroCustoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

