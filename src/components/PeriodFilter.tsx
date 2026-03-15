import { PERIOD_FILTERS, PeriodFilter as PF } from '@/types/finance';
import { motion } from 'framer-motion';

interface Props {
  value: PF;
  onChange: (v: PF) => void;
  variant?: 'dark' | 'light';
}

export default function PeriodFilter({ value, onChange, variant = 'dark' }: Props) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex gap-1 p-0.5 rounded-button ${isDark ? 'glass-surface' : 'bg-muted'}`}>
      {PERIOD_FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`relative px-2 sm:px-4 py-1.5 sm:py-2 rounded-button text-[11px] sm:text-sm font-semibold transition-colors ${
            value === f.value
              ? isDark ? 'text-card-foreground' : 'text-primary-foreground'
              : isDark ? 'text-foreground/60' : 'text-muted-foreground'
          }`}
        >
          {value === f.value && (
            <motion.div
              layoutId={`period-${variant}`}
              className={`absolute inset-0 rounded-button ${isDark ? 'bg-white/15' : 'bg-primary'}`}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{f.label}</span>
        </button>
      ))}
    </div>
  );
}
