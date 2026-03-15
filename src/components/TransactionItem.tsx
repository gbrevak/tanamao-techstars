import { Transaction, CATEGORIES } from '@/types/finance';
import { motion } from 'framer-motion';

interface Props {
  transaction: Transaction;
  index: number;
  valoresVisiveis?: boolean;
}

export default function TransactionItem({ transaction, index, valoresVisiveis = true }: Props) {
  const cat = CATEGORIES[transaction.categoria];
  const isEntrada = transaction.tipo === 'entrada';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex items-center gap-3 p-3 rounded-card glass-surface hover:bg-white/10 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg flex-shrink-0">
        {cat.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-card-foreground truncate">{transaction.descricao}</p>
        <p className="text-xs text-muted-foreground">
          {cat.label} · {transaction.conta === 'negocio' ? '💼' : '🏠'} {' '}
          {new Date(transaction.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
        </p>
      </div>
      <span className={`text-sm font-bold ${isEntrada ? 'text-money' : 'text-expense'}`}>
        {isEntrada ? '+' : '-'} R$ {transaction.valor.toFixed(0)}
      </span>
    </motion.div>
  );
}
