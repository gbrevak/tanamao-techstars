import { useState, useCallback, useMemo } from 'react';
import { Transaction, PeriodFilter, AccountType } from '@/types/finance';
import { mockTransactions } from '@/data/mockData';

function filterByPeriod(transactions: Transaction[], period: PeriodFilter): Transaction[] {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case 'hoje':
      start.setHours(0, 0, 0, 0);
      break;
    case 'semana':
      start.setDate(now.getDate() - 7);
      break;
    case 'mes':
      start.setMonth(now.getMonth() - 1);
      break;
    case 'ano':
      start.setFullYear(now.getFullYear() - 1);
      break;
  }

  return transactions.filter(t => new Date(t.data) >= start);
}

export function useFinanceStore() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [period, setPeriod] = useState<PeriodFilter>('mes');
  const [accountFilter, setAccountFilter] = useState<AccountType | 'todos'>('todos');

  const filtered = useMemo(() => {
    let result = filterByPeriod(transactions, period);
    if (accountFilter !== 'todos') {
      result = result.filter(t => t.conta === accountFilter);
    }
    return result.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [transactions, period, accountFilter]);

  const totals = useMemo(() => {
    const entradas = filtered.filter(t => t.tipo === 'entrada').reduce((s, t) => s + t.valor, 0);
    const saidas = filtered.filter(t => t.tipo === 'saida').reduce((s, t) => s + t.valor, 0);
    return { entradas, saidas, saldo: entradas - saidas };
  }, [filtered]);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...t, id: Date.now().toString() }, ...prev]);
  }, []);

  return {
    transactions: filtered,
    allTransactions: transactions,
    period,
    setPeriod,
    accountFilter,
    setAccountFilter,
    totals,
    addTransaction,
  };
}
