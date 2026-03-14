import { Transaction, QuizQuestion, CreditOption } from '@/types/finance';

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const mockTransactions: Transaction[] = [
  { id: '1', valor: 150, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Venda de açaí', data: daysAgo(0) },
  { id: '2', valor: 45, tipo: 'saida', conta: 'negocio', categoria: 'mercadoria', descricao: 'Compra de copos', data: daysAgo(0) },
  { id: '3', valor: 200, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Venda na feira', data: daysAgo(1) },
  { id: '4', valor: 80, tipo: 'saida', conta: 'pessoal', categoria: 'comida', descricao: 'Almoço família', data: daysAgo(1) },
  { id: '5', valor: 350, tipo: 'entrada', conta: 'negocio', categoria: 'servico', descricao: 'Frete entregue', data: daysAgo(2) },
  { id: '6', valor: 120, tipo: 'saida', conta: 'negocio', categoria: 'transporte', descricao: 'Gasolina', data: daysAgo(2) },
  { id: '7', valor: 500, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Encomenda grande', data: daysAgo(3) },
  { id: '8', valor: 250, tipo: 'saida', conta: 'pessoal', categoria: 'aluguel', descricao: 'Parte do aluguel', data: daysAgo(4) },
  { id: '9', valor: 90, tipo: 'saida', conta: 'negocio', categoria: 'luz-agua', descricao: 'Conta de luz', data: daysAgo(5) },
  { id: '10', valor: 180, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Venda do sábado', data: daysAgo(6) },
  { id: '11', valor: 420, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Dia bom na feira', data: daysAgo(8) },
  { id: '12', valor: 60, tipo: 'saida', conta: 'pessoal', categoria: 'comida', descricao: 'Mercado', data: daysAgo(10) },
  { id: '13', valor: 300, tipo: 'entrada', conta: 'negocio', categoria: 'servico', descricao: 'Conserto feito', data: daysAgo(15) },
  { id: '14', valor: 150, tipo: 'saida', conta: 'negocio', categoria: 'mercadoria', descricao: 'Reposição estoque', data: daysAgo(20) },
  { id: '15', valor: 700, tipo: 'entrada', conta: 'negocio', categoria: 'vendas', descricao: 'Melhor semana', data: daysAgo(25) },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    pergunta: 'O que acontece se você não pagar o DAS do MEI?',
    opcoes: ['Nada, relaxa', 'Perde o CNPJ na hora', 'Acumula dívida e pode perder benefícios do INSS', 'Vai preso'],
    respostaCorreta: 2,
    explicacao: 'Se não pagar o DAS, a dívida acumula e você pode perder benefícios como aposentadoria e auxílio-doença pelo INSS. Não perde o CNPJ de imediato, mas pode ser cancelado depois de 12 meses.',
    categoria: 'mei',
  },
  {
    id: '2',
    pergunta: 'Quanto o MEI pode faturar por ano em 2024?',
    opcoes: ['R$ 50 mil', 'R$ 81 mil', 'R$ 100 mil', 'R$ 144 mil'],
    respostaCorreta: 1,
    explicacao: 'O limite de faturamento do MEI é R$ 81.000 por ano, ou seja, R$ 6.750 por mês em média. Se passar disso, precisa migrar para Microempresa (ME).',
    categoria: 'mei',
  },
  {
    id: '3',
    pergunta: 'Separar dinheiro pessoal do negócio é importante por quê?',
    opcoes: ['Não é importante', 'Pra saber quanto o negócio realmente dá', 'Só pra ficar bonito', 'O banco obriga'],
    respostaCorreta: 1,
    explicacao: 'Misturar as contas faz você achar que tá ganhando mais (ou menos) do que realmente tá. Separar ajuda a saber o lucro real do negócio.',
    categoria: 'geral',
  },
  {
    id: '4',
    pergunta: 'O que é o DAS do MEI?',
    opcoes: ['Um imposto federal', 'Uma guia mensal com todos os impostos do MEI', 'Uma multa', 'Um benefício'],
    respostaCorreta: 1,
    explicacao: 'O DAS (Documento de Arrecadação do Simples Nacional) é a guia mensal que o MEI paga. Inclui INSS, ISS e ICMS, tudo junto num valor fixo.',
    categoria: 'impostos',
  },
  {
    id: '5',
    pergunta: 'Qual a vantagem de ter o MEI formalizado?',
    opcoes: ['Nenhuma, só gasto', 'Emitir nota fiscal e ter CNPJ', 'Só serve pra banco', 'Paga menos luz'],
    respostaCorreta: 1,
    explicacao: 'Com o MEI você tem CNPJ, pode emitir nota fiscal, tem acesso a crédito com taxas menores, e contribui pro INSS (aposentadoria, auxílio-doença).',
    categoria: 'mei',
  },
];

export const creditOptions: CreditOption[] = [
  {
    id: '1',
    banco: 'Bradesco',
    nome: 'Cartão MEI Bradesco',
    taxa: '1,49% ao mês',
    descricao: 'Sem anuidade no primeiro ano. Cashback de 1% em compras de mercadoria.',
    cor: 'hsl(0, 70%, 45%)',
    beneficio: 'Cashback 1%',
  },
  {
    id: '2',
    banco: 'Itaú',
    nome: 'Crédito Tá na Mão Itaú',
    taxa: '1,29% ao mês',
    descricao: 'Taxa especial pra quem usa o app. Limite pré-aprovado de R$ 5.000.',
    cor: 'hsl(25, 80%, 50%)',
    beneficio: 'Taxa Especial',
  },
  {
    id: '3',
    banco: 'Nubank',
    nome: 'Conta PJ Nubank',
    taxa: '0% manutenção',
    descricao: 'Conta gratuita com cartão de débito e crédito. Pix ilimitado.',
    cor: 'hsl(280, 60%, 50%)',
    beneficio: 'Conta Grátis',
  },
  {
    id: '4',
    banco: 'Caixa',
    nome: 'Microcrédito Caixa',
    taxa: '0,99% ao mês',
    descricao: 'Linha especial pro pequeno empreendedor. Até R$ 20 mil sem garantia.',
    cor: 'hsl(210, 70%, 45%)',
    beneficio: 'Menor taxa',
  },
];
