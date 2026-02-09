# Backend - Bootcamp Cultiva

Este é o repositório do backend da aplicação, configurado com **Node.js**, **Express** e **Prisma 7**.

## Pré-requisitos

- Node.js instalado (v18+)
- Conta no Supabase (ou outro PostgreSQL)

## Como rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Use o `.env.example` como base.
   - **IMPORTANTE:** O Prisma 7 com Supabase utiliza duas URLs:
     - `DATABASE_URL`: Para o Pooler (Porta 6543) - conexão da aplicação.
     - `DIRECT_URL`: Para conexão direta (Porta 5432) - usada para migrações.

3. **Sincronize o banco de dados:**
   - Para prototipagem rápida (sem histórico de migrações):
     ```bash
     npx prisma db push
     ```

4. **Inicie o servidor (com auto-restart):**
   ```bash
   npm run dev
   ```

## Estrutura Prisma 7

Este projeto utiliza o **Driver Adapter** (`pg`) para CommonJS. A configuração de conexão está centralizada no arquivo [prisma.config.js](prisma.config.js).
