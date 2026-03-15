import { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/assets/logo.svg?react';
import { TrendingUp, TrendingDown, Wallet, Eye, EyeOff, DollarSign } from 'lucide-react';
import { useFinanceStore } from '@/hooks/useFinanceStore';
import PeriodFilter from '@/components/PeriodFilter';
import AccountToggle from '@/components/AccountToggle';
import TransactionItem from '@/components/TransactionItem';
import MiniChart from '@/components/MiniChart';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const { transactions, period, setPeriod, accountFilter, setAccountFilter, totals } = useFinanceStore();
  const [valoresVisiveis, setValoresVisiveis] = useState(false);

  const formatCurrency = (value: number) => {
    if (!valoresVisiveis) return '•••••';
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
  };

  const lucro = totals.entradas > 0 ? ((totals.saldo / totals.entradas) * 100) : 0;

  return (
    <div className="min-h-screen gradient-bg pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="w-10 h-10">
              <Logo className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight leading-tight">Tá na Mão</h1>
              <p className="text-foreground/50 text-xs font-medium">E aí, como tá o bolso?</p>
            </div>
          </motion.div>

          {/* Period filter */}
          <PeriodFilter value={period} onChange={setPeriod} variant="dark" />
        </div>
      </div>

      {/* Balance card */}
      <div className="px-4 mb-4">
        <motion.div
          className="glass-surface rounded-card p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground font-medium">Saldo no período</p>
            <motion.button
              onClick={() => setValoresVisiveis(v => !v)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground"
              whileTap={{ scale: 0.9 }}
            >
              {valoresVisiveis ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
            </motion.button>
          </div>
          <p className={`text-3xl font-extrabold tracking-tight ${totals.saldo >= 0 ? 'text-money' : 'text-expense'}`}>
            {formatCurrency(totals.saldo)}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-money/15 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-money" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Entrou</p>
                <p className="text-sm font-bold text-card-foreground truncate">{formatCurrency(totals.entradas)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-expense/15 flex items-center justify-center shrink-0">
                <TrendingDown className="w-4 h-4 text-expense" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Saiu</p>
                <p className="text-sm font-bold text-card-foreground truncate">{formatCurrency(totals.saidas)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Lucro</p>
                <p className={`text-sm font-bold truncate ${lucro >= 0 ? 'text-money' : 'text-expense'}`}>
                  {valoresVisiveis ? `${lucro.toFixed(0)}%` : '•••'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Account toggle */}
      <div className="px-4 mb-4">
        <AccountToggle value={accountFilter} onChange={setAccountFilter} />
      </div>

      {/* Chart */}
      <div className="px-4 mb-4">
        <MiniChart transactions={transactions} />
      </div>

      {/* Transactions */}
      <div className="px-4">
        <h2 className="text-sm font-semibold text-foreground/70 mb-2">Últimas movimentações</h2>
        <div className="space-y-2">
          {transactions.length === 0 ? (
            <div className="glass-surface rounded-card p-6 text-center">
              <Wallet className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Nenhuma movimentação nesse período</p>
            </div>
          ) : (
            transactions.map((t, i) => (
              <TransactionItem key={t.id} transaction={t} index={i} />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}