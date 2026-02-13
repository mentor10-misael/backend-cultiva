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


let prisma;
try {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
  console.log('Prisma Client initialized');
} catch (e) {
  console.error('Failed to initialize Prisma:', e);
}

app.get("/", (req, res) => {
  console.log('GET / request received');
  res.json({ message: "Backend Cultiva API is running" });
});
const service = require("./modules/centro-custo/centroCusto.service")
app.post("/centro-custo", async (req, res) => {
 try {
     // TEMPORÁRIO — depois virá do login
     const agricultorId = "145837fc-ecec-497e-9ef5-7d8c5c4639cc";
 
     const centro = await service.criarCentroCusto({
       ...req.body,
       agricultorId
     });
 
     res.status(201).json(centro);
 
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 
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

