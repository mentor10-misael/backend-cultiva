const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Exporta o cliente do Prisma para ser usado nos Services
const prisma = new PrismaClient({ adapter });

module.exports = prisma;