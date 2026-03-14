import { motion } from 'framer-motion';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useFinanceStore } from '@/hooks/useFinanceStore';
import PeriodFilter from '@/components/PeriodFilter';
import AccountToggle from '@/components/AccountToggle';
import TransactionItem from '@/components/TransactionItem';
import MiniChart from '@/components/MiniChart';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const { transactions, period, setPeriod, accountFilter, setAccountFilter, totals } = useFinanceStore();

  return (
    <div className="min-h-screen gradient-bg pb-24">
      {/* Header */}
      <div className="px-4 pt-8 pb-6">
        {/* Logo centralizado em cima do título */}
        <div className="flex flex-col items-center mb-4">
          <motion.div
            className="w-16 h-16 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Logo className="w-full h-full text-white" />
          </motion.div>
          <motion.h1
            className="text-3xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tá na Mão
          </motion.h1>
        </div>
        <motion.p
          className="text-foreground/60 text-sm font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          E aí, como tá o bolso hoje?
        </motion.p>

        {/* Period filter */}
        <div className="mt-4 flex justify-center">
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
          <p className="text-sm text-muted-foreground font-medium mb-1">Saldo no período</p>
          <p className={`text-3xl font-extrabold tracking-tight ${totals.saldo >= 0 ? 'text-money' : 'text-expense'}`}>
            R$ {totals.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
          </p>

          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-money/15 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-money" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Entrou</p>
                <p className="text-sm font-bold text-card-foreground">R$ {totals.entradas.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-expense/15 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-expense" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Saiu</p>
                <p className="text-sm font-bold text-card-foreground">R$ {totals.saidas.toLocaleString('pt-BR')}</p>
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