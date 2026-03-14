import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { TransactionType, AccountType, Category, CATEGORIES } from '@/types/finance';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

export default function AddTransaction() {
  const navigate = useNavigate();
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<TransactionType>('entrada');
  const [conta, setConta] = useState<AccountType>('negocio');
  const [categoria, setCategoria] = useState<Category>('vendas');
  const [descricao, setDescricao] = useState('');

  const handleSave = () => {
    if (!valor || parseFloat(valor) <= 0) {
      toast.error('Digita o valor aí!');
      return;
    }

    // In a real app, this would save to the store/db
    toast.success('Tá na mão! Salvo. ✅');
    setTimeout(() => navigate('/dashboard'), 800);
  };

  const handleNumpad = (n: string) => {
    if (n === 'clear') return setValor('');
    if (n === 'back') return setValor(v => v.slice(0, -1));
    if (n === '.' && valor.includes('.')) return;
    setValor(v => v + n);
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="touch-target flex items-center gap-1 text-foreground/70 mb-4">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        {/* Value display */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-foreground/50 text-sm mb-2">Quanto?</p>
          <p className={`text-5xl font-extrabold tracking-tight ${tipo === 'entrada' ? 'text-foreground' : 'text-foreground'}`}>
            R$ {valor || '0'}
          </p>
        </motion.div>

        {/* Type toggle */}
        <div className="flex gap-2 mb-4">
          {(['entrada', 'saida'] as TransactionType[]).map(t => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={`flex-1 touch-target rounded-button font-bold text-base transition-all brand-bounce ${
                tipo === t
                  ? t === 'entrada' ? 'bg-money text-primary-foreground' : 'bg-expense text-primary-foreground'
                  : 'glass-surface text-card-foreground'
              }`}
            >
              {t === 'entrada' ? '💰 Venda' : '💸 Gasto'}
            </button>
          ))}
        </div>

        {/* Account toggle */}
        <div className="flex gap-2 mb-4">
          {(['negocio', 'pessoal'] as AccountType[]).map(c => (
            <button
              key={c}
              onClick={() => setConta(c)}
              className={`flex-1 touch-target rounded-button font-bold text-sm transition-all brand-bounce ${
                conta === c
                  ? c === 'negocio' ? 'bg-business text-primary-foreground' : 'bg-personal text-primary-foreground'
                  : 'glass-surface text-card-foreground'
              }`}
            >
              {c === 'negocio' ? '💼 Negócio' : '🏠 Pessoal'}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {(Object.entries(CATEGORIES) as [Category, { label: string; emoji: string }][]).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setCategoria(key)}
              className={`rounded-card p-2 flex flex-col items-center gap-1 touch-target text-xs font-semibold transition-all brand-bounce ${
                categoria === key ? 'bg-primary text-primary-foreground' : 'glass-surface text-card-foreground'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Description */}
        <input
          type="text"
          placeholder="Descreve rapidão (opcional)"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="w-full glass-surface rounded-button px-4 py-3 text-card-foreground placeholder:text-muted-foreground text-sm font-medium mb-4 border-none outline-none focus:ring-2 focus:ring-primary touch-target"
        />

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1','2','3','4','5','6','7','8','9','.','0','back'].map(n => (
            <button
              key={n}
              onClick={() => handleNumpad(n)}
              className="glass-surface rounded-button touch-target text-xl font-bold text-card-foreground brand-bounce active:bg-muted"
            >
              {n === 'back' ? '⌫' : n}
            </button>
          ))}
        </div>

        {/* Save */}
        <motion.button
          onClick={handleSave}
          className="w-full touch-target rounded-button bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 shadow-lg brand-bounce"
          whileTap={{ scale: 0.95 }}
        >
          <Check className="w-5 h-5" /> Salvar
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
