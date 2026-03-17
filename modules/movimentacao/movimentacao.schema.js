const { z } = require('zod');

// Definimos o que é obrigatório e quais os tipos de cada campo
const movimentacaoSchema = z.object({
  syncId: z.string().uuid({ message: "O syncId deve ser um UUID válido" }),
  tipo: z.enum(['ENTRADA', 'SAIDA'], { message: "O tipo deve ser ENTRADA ou SAIDA" }),
  valor: z.number().positive({ message: "O valor deve ser maior que zero" }),
  descricao: z.string().min(3, { message: "A descrição deve ter pelo menos 3 caracteres" }),
  dataMovimento: z.string().datetime({ message: "Data inválida" }),
  formaPagamento: z.string().min(1, { message: "Informe a forma de pagamento" }),
  entidade: z.string().optional(), // Nome de quem pagou ou recebeu (opcional)
  centroCustoId: z.string().uuid({ message: "ID do Centro de Custo inválido" }),
  agricultorId: z.string().uuid({ message: "ID do Agricultor inválido" })
});

// Como o PWA pode enviar uma lista de uma vez só, criamos o schema para arrays também
const syncSchema = z.array(movimentacaoSchema).or(movimentacaoSchema);

module.exports = { syncSchema };