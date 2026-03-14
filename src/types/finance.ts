export type TransactionType = 'entrada' | 'saida';
export type AccountType = 'pessoal' | 'negocio';
export type Category = 'comida' | 'aluguel' | 'mercadoria' | 'luz-agua' | 'vendas' | 'servico' | 'transporte' | 'outros';

export interface Transaction {
  id: string;
  valor: number;
  tipo: TransactionType;
  conta: AccountType;
  categoria: Category;
  descricao: string;
  data: string; // ISO date
}

export interface QuizQuestion {
  id: string;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
  categoria: 'mei' | 'impostos' | 'credito' | 'geral';
}

export interface CreditOption {
  id: string;
  banco: string;
  nome: string;
  taxa: string;
  descricao: string;
  cor: string;
  beneficio: string;
}

export const CATEGORIES: Record<Category, { label: string; emoji: string }> = {
  comida: { label: 'Comida', emoji: '🍔' },
  aluguel: { label: 'Aluguel', emoji: '🏠' },
  mercadoria: { label: 'Mercadoria', emoji: '📦' },
  'luz-agua': { label: 'Luz/Água', emoji: '💡' },
  vendas: { label: 'Vendas', emoji: '💰' },
  servico: { label: 'Serviço', emoji: '🔧' },
  transporte: { label: 'Transporte', emoji: '🚗' },
  outros: { label: 'Outros', emoji: '📝' },
};

export const PERIOD_FILTERS = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Semana', value: 'semana' },
  { label: 'Mês', value: 'mes' },
  { label: 'Ano', value: 'ano' },
] as const;

export type PeriodFilter = typeof PERIOD_FILTERS[number]['value'];
