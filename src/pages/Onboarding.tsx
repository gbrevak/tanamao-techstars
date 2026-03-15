import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Notebook, Brain, Ban, MessageCircle } from 'lucide-react';

const options = [
  { icon: Notebook, label: 'No papel', emoji: '📝' },
  { icon: Brain, label: 'Na cabeça', emoji: '🧠' },
  { icon: Ban, label: 'Não controlo', emoji: '🤷' },
  { icon: MessageCircle, label: 'No zap', emoji: '📱' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else {
      localStorage.setItem('tanamao-onboarded', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-md text-center"
          >
            <motion.h1
              className="text-4xl font-extrabold text-foreground mb-2 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Tá na Mão 🤙
            </motion.h1>
            <motion.p
              className="text-foreground/70 text-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Seu dinheiro organizado de um jeito que você entende.
            </motion.p>

            <motion.h2
              className="text-xl font-bold text-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hoje você controla suas finanças como?
            </motion.h2>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {options.map((opt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  onClick={() => setSelected(i)}
                  className={`glass-surface rounded-card p-4 flex flex-col items-center gap-2 touch-target brand-bounce ${
                    selected === i ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' : ''
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="text-sm font-semibold text-card-foreground">{opt.label}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={handleContinue}
              disabled={selected === null}
              className={`w-full touch-target rounded-button font-bold text-lg flex items-center justify-center gap-2 transition-all brand-bounce ${
                selected !== null
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-foreground/10 text-foreground/30 cursor-not-allowed'
              }`}
              whileTap={selected !== null ? { scale: 0.95 } : {}}
            >
              Bora! <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-md text-center"
          >
            <span className="text-5xl mb-4 block">🚀</span>
            <h2 className="text-2xl font-extrabold text-foreground mb-3">
              Beleza, a gente resolve isso!
            </h2>
            <p className="text-foreground/70 mb-4 text-lg">
              Com o <strong>Tá na Mão</strong> você vai:
            </p>
            <div className="space-y-3 text-left mb-8">
              {[
                '✅ Anotar vendas e gastos em 10 segundos',
                '✅ Separar o que é do negócio e o que é pessoal',
                '✅ Saber quanto tá sobrando de verdade',

              ].map((item, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-foreground/90 font-medium text-base"
                >
                  {item}
                </motion.p>
              ))}
            </div>

            <motion.button
              onClick={handleContinue}
              className="w-full touch-target rounded-button bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 shadow-lg brand-bounce"
              whileTap={{ scale: 0.95 }}
            >
              Começar agora! <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
