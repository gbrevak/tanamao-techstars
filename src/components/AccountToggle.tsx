import { motion } from 'framer-motion';
import { AccountType } from '@/types/finance';

interface Props {
  value: AccountType | 'todos';
  onChange: (v: AccountType | 'todos') => void;
}

const options = [
  { value: 'todos' as const, label: 'Tudo' },
  { value: 'negocio' as const, label: '💼 Negócio' },
  { value: 'pessoal' as const, label: '🏠 Pessoal' },
];

export default function AccountToggle({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 p-1 rounded-button bg-muted">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative flex-1 px-3 py-2 rounded-button text-sm font-semibold touch-target transition-colors ${
            value === opt.value ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          {value === opt.value && (
            <motion.div
              layoutId="account-toggle"
              className={`absolute inset-0 rounded-button ${
                opt.value === 'negocio' ? 'bg-business' : opt.value === 'pessoal' ? 'bg-personal' : 'bg-primary'
              }`}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
