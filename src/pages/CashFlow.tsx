import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFinanceStore } from '@/hooks/useFinanceStore';
import PeriodFilter from '@/components/PeriodFilter';
import BottomNav from '@/components/BottomNav';
import { CATEGORIES, Category } from '@/types/finance';
import { useMemo } from 'react';

export default function CashFlow() {
  const navigate = useNavigate();
  const { transactions, period, setPeriod, totals } = useFinanceStore();

  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter(t => t.tipo === 'saida').forEach(t => {
      map[t.categoria] = (map[t.categoria] || 0) + t.valor;
    });
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, val]) => ({ categoria: cat as Category, valor: val, pct: totals.saidas > 0 ? (val / totals.saidas) * 100 : 0 }));
  }, [transactions, totals.saidas]);

  const projecao = useMemo(() => {
    const diasNoMes = 30;
    const diasPassados = period === 'hoje' ? 1 : period === 'semana' ? 7 : period === 'mes' ? new Date().getDate() : 365;
    const mediaDiaria = totals.entradas / Math.max(diasPassados, 1);
    return {
      projecaoMensal: mediaDiaria * diasNoMes,
      mediaEntrada: mediaDiaria,
      mediaSaida: totals.saidas / Math.max(diasPassados, 1),
    };
  }, [totals, period]);

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate('/dashboard')} className="touch-target flex items-center gap-1 text-foreground/70 mb-2">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <h1 className="text-2xl font-extrabold text-foreground mb-4 text-center">Fluxo de Caixa 📊</h1>

        <PeriodFilter value={period} onChange={setPeriod} variant="dark" />

        {/* Projection card */}
        <motion.div
          className="glass-surface rounded-card p-5 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Target className="w-5 h-5 text-money" />
            <h2 className="font-bold text-card-foreground">Projeção pro mês</h2>
          </div>
          <p className="text-3xl font-extrabold text-money mb-1">
            R$ {projecao.projecaoMensal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-muted-foreground">Se continuar nesse ritmo de vendas</p>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-muted rounded-button p-3 text-center">
              <TrendingUp className="w-4 h-4 text-money mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Média/dia</p>
              <p className="text-sm font-bold text-card-foreground">R$ {projecao.mediaEntrada.toFixed(0)}</p>
            </div>
            <div className="flex-1 bg-muted rounded-button p-3 text-center">
              <TrendingDown className="w-4 h-4 text-expense mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Gasto/dia</p>
              <p className="text-sm font-bold text-card-foreground">R$ {projecao.mediaSaida.toFixed(0)}</p>
            </div>
          </div>
        </motion.div>

        {/* Category breakdown */}
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-foreground/70 mb-2">Pra onde tá indo o dinheiro</h2>
          <div className="glass-surface rounded-card p-4 space-y-3">
            {categoryBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">Sem gastos nesse período 🎉</p>
            ) : (
              categoryBreakdown.map((item, i) => {
                const cat = CATEGORIES[item.categoria];
                return (
                  <motion.div
                    key={item.categoria}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-card-foreground">
                        {cat.emoji} {cat.label}
                      </span>
                      <span className="text-sm font-bold text-card-foreground">
                        R$ {item.valor.toFixed(0)} ({item.pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-expense rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
