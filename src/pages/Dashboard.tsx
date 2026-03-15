import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/assets/logo.svg?react';
import { Sparkles, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, DollarSign, Target } from 'lucide-react';
import { useFinanceStore } from '@/hooks/useFinanceStore';
import PeriodFilter from '@/components/PeriodFilter';
import AccountToggle from '@/components/AccountToggle';
import TransactionItem from '@/components/TransactionItem';
import MiniChart from '@/components/MiniChart';
import BottomNav from '@/components/BottomNav';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Dashboard() {
  const { transactions, period, setPeriod, accountFilter, setAccountFilter, totals } = useFinanceStore();
  const [valoresVisiveis, setValoresVisiveis] = useState(false);
  const [goal, setGoal] = useState<{ title: string; amount: number; months: number } | null>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([
    { role: 'bot', text: 'Oi! Sou a assistente do Tá na Mão – me conta como posso ajudar hoje 😊' },
  ]);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tanamao-goal');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.title === 'string' &&
          typeof parsed.amount === 'number' &&
          typeof parsed.months === 'number'
        ) {
          setGoal(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const scrollEl = chatScrollRef.current;
    if (!scrollEl) return;

    scrollEl.scrollTop = scrollEl.scrollHeight;
  }, [chatMessages, chatOpen]);

  const formatCurrency = (value: number) => {
    if (!valoresVisiveis) return '•••••';
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
  };

  const lucro = totals.entradas - totals.saidas;
  const goalPercent = goal && goal.amount > 0 ? Math.min(100, Math.max(0, (totals.saldo / goal.amount) * 100)) : 0;

  const sendChatMessage = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setChatMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');

    const reply = () => {
      const normalized = trimmed.toLowerCase();
      if (normalized.includes('meta') || normalized.includes('objetivo')) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: goal
              ? `Tá indo bem! Você já juntou ${formatCurrency(Math.max(0, totals.saldo))} de R$ ${goal.amount.toLocaleString('pt-BR')} (ou ${Math.round(
                  goalPercent,
                )}% da meta). Continue anotando suas entradas e gastos pra manter o controle!`
              : 'Ainda não tem meta definida. Vai na aba Objetivos e cria a sua para eu te ajudar melhor 😉',
          },
        ]);
        return;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: `Boa! Isso é algo que dá pra resolver no app — tente anotar essa movimentação como entrada ou saída e eu te mostro como tá ficando.`,
        },
      ]);
    };

    setTimeout(reply, 500);
  };

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
              <h1 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight leading-tight whitespace-nowrap">Tá na Mão</h1>
              <p className="text-foreground/50 text-[11px] sm:text-xs font-medium whitespace-nowrap">E aí, como tá o bolso?</p>
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
          <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center mb-1">Saldo no período</p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${totals.saldo >= 0 ? 'text-money' : 'text-expense'}`}>
              {formatCurrency(totals.saldo)}
            </p>
            <motion.button
              onClick={() => setValoresVisiveis(v => !v)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground"
              whileTap={{ scale: 0.9 }}
            >
              {valoresVisiveis ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-money/15 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-money" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">Entrou</p>
                <p className="text-xs sm:text-sm font-bold text-card-foreground truncate">{formatCurrency(totals.entradas)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-expense/15 flex items-center justify-center shrink-0">
                <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-expense" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">Saiu</p>
                <p className="text-xs sm:text-sm font-bold text-card-foreground truncate">{formatCurrency(totals.saidas)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">Lucro</p>
                <p className={`text-xs sm:text-sm font-bold truncate ${lucro >= 0 ? 'text-money' : 'text-expense'}`}>
                  {valoresVisiveis ? formatCurrency(lucro) : '•••'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {goal && (
        <div className="px-4 mb-4">
          <motion.div
            className="glass-surface rounded-card p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Meta</p>
                <p className="text-sm font-semibold text-foreground">{goal.title}</p>
              </div>
              <Target className="w-6 h-6 text-primary" />
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Juntou{' '}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(Math.max(0, totals.saldo))}
                  </span>{' '}
                  de <span className="font-semibold text-foreground">R$ {goal.amount.toLocaleString('pt-BR')}</span>
                </p>
                <span className="text-xs font-semibold text-primary">{Math.round(goalPercent)}% da meta</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Pra fechar em {goal.months} meses, guarda{' '}
                <span className="font-semibold text-foreground">R$ {Math.ceil(goal.amount / goal.months).toLocaleString('pt-BR')}</span> por mês
              </p>
              <Progress value={goalPercent} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Account toggle */}
      <div className="px-4 mb-4">
        <AccountToggle value={accountFilter} onChange={setAccountFilter} />
      </div>

      {/* Chart */}
      <div className="px-4 mb-4">
        <MiniChart transactions={transactions} valoresVisiveis={valoresVisiveis} />
      </div>

      {/* Transactions */}
      <div className="px-4">
        <h2 className="text-sm font-semibold text-foreground/70 mb-2 text-center">Últimas movimentações</h2>
        <div className="space-y-2">
          {transactions.length === 0 ? (
            <div className="glass-surface rounded-card p-6 text-center">
              <Wallet className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Nenhuma movimentação nesse período</p>
            </div>
          ) : (
            transactions.map((t, i) => (
              <TransactionItem key={t.id} transaction={t} index={i} valoresVisiveis={valoresVisiveis} />
            ))
          )}
        </div>
      </div>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-20 right-4 z-50 h-12 w-12 rounded-full bg-primary/80 text-primary-foreground shadow-lg shadow-black/30 flex items-center justify-center backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            aria-label="Abrir assistente"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assistente Tá na Mão</DialogTitle>
            <DialogDescription>Fala comigo que eu te ajudo a entender seu dinheiro.</DialogDescription>
          </DialogHeader>

          <div
            ref={chatScrollRef}
            className="mt-4 max-h-64 overflow-y-auto space-y-3 rounded-xl border border-border bg-background/80 p-4"
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    msg.role === 'bot'
                      ? 'bg-slate-800 text-white'
                      : 'bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendChatMessage(chatInput);
                }
              }}
              placeholder="Escreve aí..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              onClick={() => sendChatMessage(chatInput)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              aria-label="Enviar mensagem"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>

          <DialogFooter className="mt-4">
            <button
              type="button"
              className="text-xs font-medium text-muted-foreground"
              onClick={() => setChatOpen(false)}
            >
              Fechar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}