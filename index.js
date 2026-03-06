require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const centroCustoRoutes = require("./modules/centro-custo/centroCusto.routes");
const eventoRoutes = require("./modules/evento/evento.routes");

// Redundant local prisma initialization removed - using centralized client instead.

app.get("/", (req, res) => {
  console.log('GET / request received');
  res.json({ message: "Backend Cultiva API  roda aqui!!!" });
});
//peruguntar sobre "app.use(centroCustoRoutes)" em relação a "app.use("/eventos", eventoRoutes)" se há conflitos
app.use(centroCustoRoutes);
app.use("/eventos", eventoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

