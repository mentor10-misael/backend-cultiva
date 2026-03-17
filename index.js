require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movimentacaoRoutes = require("./modules/movimentacao/movimentacao.routes");
const pg = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require("@prisma/client");
const centroCustoRoutes = require("./modules/centro-custo/centroCusto.routes");
const eventoRoutes = require("./modules/evento/evento.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend Cultiva API is running" });
});

app.use("/movimentacoes", movimentacaoRoutes);
//peruguntar sobre "app.use(centroCustoRoutes)" em relação a "app.use("/eventos", eventoRoutes)" se há conflitos
app.use(centroCustoRoutes);
app.use("/eventos", eventoRoutes);

let prisma;
try {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
} catch (error) {
  console.error("Erro na conexão com o banco de dados:", error);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

