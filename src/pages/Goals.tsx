import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

type Goal = {
  title: string;
  amount: number;
  months: number;
};

const STORAGE_KEY = 'tanamao-goal';

function loadGoal(): Goal | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Goal;
    if (typeof parsed?.title !== 'string') return null;
    if (typeof parsed?.amount !== 'number' || typeof parsed?.months !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveGoal(goal: Goal) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
}

export default function Goals() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');

  useEffect(() => {
    const goal = loadGoal();
    if (goal) {
      setTitle(goal.title);
      setAmount(goal.amount.toString());
      setMonths(goal.months.toString());
    }
  }, []);

  const amountNumber = useMemo(() => Number(amount.replace(/\D/g, '')) || 0, [amount]);
  const monthsNumber = useMemo(() => Number(months.replace(/\D/g, '')) || 0, [months]);

  const monthly = useMemo(() => {
    if (monthsNumber <= 0) return 0;
    return Math.ceil(amountNumber / monthsNumber);
  }, [amountNumber, monthsNumber]);

  const canSave = title.trim().length > 0 && amountNumber > 0 && monthsNumber > 0;

  const handleSave = () => {
    if (!canSave) return;

    saveGoal({ title: title.trim(), amount: amountNumber, months: monthsNumber });

    toast.success('Meta salva!', {
      description: 'Agora é só usar o app e acompanhar o progresso na tela inicial.',
    });
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Objetivos 🎯</h1>
            <p className="text-muted-foreground text-sm mt-1">Define sua meta e a gente te lembra todo mês quanto precisa guardar.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs font-semibold text-primary flex items-center gap-1"
          >
            Voltar <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="mt-6 glass-surface rounded-card p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Qual seu objetivo?</label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: comprar celular novo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quanto você precisa juntar?</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">R$</span>
              <Input
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/\D/g, ''))}
                placeholder="0"
                inputMode="numeric"
                className={cn('pl-8', !amount && 'placeholder:text-muted-foreground')}
              />
            </div>
            <p className="text-xs text-muted-foreground">Digite só números, a gente cuida do resto.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Em quantos meses?</label>
            <Input
              value={months}
              onChange={e => setMonths(e.target.value.replace(/\D/g, ''))}
              placeholder="Ex: 6"
              inputMode="numeric"
              min={1}
            />
            <p className="text-xs text-muted-foreground">Quanto antes você começar, mais tranquilo fica.</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button
              onClick={handleSave}
              disabled={!canSave}
              className="flex-1"
            >
              Salvar meta
            </Button>
          </div>

          {canSave && (
            <div className="rounded-md bg-white/10 p-3 text-sm text-foreground">
              <p className="font-semibold">Pra fechar em {monthsNumber} meses, guarda:</p>
              <p className="mt-1 text-base">
                <span className="font-semibold">R$ {monthly.toLocaleString('pt-BR')}</span> por mês
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Dica:</span> coloque um objetivo real e vem ver na tela inicial como você tá indo.
          </div>
        </div>
      </div>

    </div>
  );
}
