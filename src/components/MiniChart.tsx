import { Transaction } from '@/types/finance';
import { useMemo } from 'react';

interface Props {
  transactions: Transaction[];
}

export default function MiniChart({ transactions }: Props) {
  const { data, totaisEntradas, totaisSaidas } = useMemo(() => {
    const days: Record<string, { entradas: number; saidas: number }> = {};
    let totaisEntradas = 0;
    let totaisSaidas = 0;
    transactions.forEach(t => {
      const key = new Date(t.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (!days[key]) days[key] = { entradas: 0, saidas: 0 };
      if (t.tipo === 'entrada') {
        days[key].entradas += t.valor;
        totaisEntradas += t.valor;
      } else {
        days[key].saidas += t.valor;
        totaisSaidas += t.valor;
      }
    });
    return { data: Object.entries(days).reverse().slice(-7), totaisEntradas, totaisSaidas };
  }, [transactions]);

  const totalGeral = totaisEntradas + totaisSaidas;
  const pctEntradas = totalGeral > 0 ? (totaisEntradas / totalGeral) * 100 : 0;
  const pctSaidas = totalGeral > 0 ? (totaisSaidas / totalGeral) * 100 : 0;

  const max = Math.max(...data.map(([, d]) => Math.max(d.entradas, d.saidas)), 1);

  return (
    <div className="glass-surface rounded-card p-4">
      <h3 className="text-sm font-semibold text-card-foreground mb-3">Entrou vs. Saiu</h3>
      <div className="flex items-end gap-2 h-24">
        {data.map(([label, d], i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-0.5 items-end w-full h-16">
              <div
                className="flex-1 bg-money/80 rounded-t-sm transition-all duration-500"
                style={{ height: `${(d.entradas / max) * 100}%`, minHeight: d.entradas > 0 ? '4px' : '0' }}
              />
              <div
                className="flex-1 bg-expense/80 rounded-t-sm transition-all duration-500"
                style={{ height: `${(d.saidas / max) * 100}%`, minHeight: d.saidas > 0 ? '4px' : '0' }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-money" /> Entrou
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-expense" /> Saiu
        </span>
      </div>
    </div>
  );
}
