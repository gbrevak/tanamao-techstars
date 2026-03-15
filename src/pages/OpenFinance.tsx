import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Landmark } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

const banks = [
  { id: 'nubank', name: 'Nubank', color: '#820AD1', emoji: '💜' },
  { id: 'inter', name: 'Banco Inter', color: '#FF7A00', emoji: '🧡' },
  { id: 'bb', name: 'Banco do Brasil', color: '#FFCC00', emoji: '💛' },
  { id: 'itau', name: 'Itaú', color: '#003399', emoji: '💙' },
];

export default function OpenFinance() {
  const navigate = useNavigate();
  const [linking, setLinking] = useState<string | null>(null);
  const [linked, setLinked] = useState<string[]>([]);

  const handleLink = (bankId: string) => {
    setLinking(bankId);
    setTimeout(() => {
      setLinked(prev => [...prev, bankId]);
      setLinking(null);
      toast.success('Banco vinculado com sucesso! ✅');
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="touch-target flex items-center gap-1 text-foreground/70 mb-6">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
            <Landmark className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-extrabold text-foreground mb-1">OpenFinance</h1>
          <p className="text-sm text-muted-foreground">Vincule seu banco para importar suas movimentações automaticamente.</p>
        </div>

        <div className="space-y-3">
          {banks.map((bank, i) => {
            const isLinked = linked.includes(bank.id);
            const isLinking = linking === bank.id;

            return (
              <motion.button
                key={bank.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => !isLinked && !isLinking && handleLink(bank.id)}
                disabled={isLinked || isLinking}
                className={`w-full glass-surface rounded-card p-4 flex items-center gap-4 brand-bounce transition-all ${
                  isLinked ? 'ring-2 ring-money/50' : ''
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: bank.color + '22' }}
                >
                  {bank.emoji}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-card-foreground">{bank.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isLinked ? 'Vinculado' : isLinking ? 'Conectando...' : 'Toque para vincular'}
                  </p>
                </div>
                {isLinked && <CheckCircle2 className="w-6 h-6 text-money shrink-0" />}
                {isLinking && (
                  <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
