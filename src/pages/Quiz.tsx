import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

export default function Quiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.respostaCorreta) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen gradient-bg pb-24 flex flex-col items-center justify-center px-4">
        <motion.div
          className="glass-surface rounded-card p-8 text-center w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Trophy className="w-16 h-16 text-money mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-card-foreground mb-2">Parabéns! 🏆</h2>
          <p className="text-muted-foreground mb-4">
            Você acertou {score} de {quizQuestions.length} perguntas!
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {score === quizQuestions.length
              ? 'Selo de Patrão desbloqueado! 💪'
              : score >= 3
              ? 'Tá quase lá, manda bem!'
              : 'Bora estudar mais um pouquinho!'}
          </p>
          <button
            onClick={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); setAnswered(false); }}
            className="w-full touch-target rounded-button bg-primary text-primary-foreground font-bold brand-bounce mb-3"
          >
            Jogar de novo
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full touch-target rounded-button glass-surface text-card-foreground font-bold brand-bounce"
          >
            Voltar pro início
          </button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate('/dashboard')} className="touch-target flex items-center gap-1 text-foreground/70 mb-2">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-foreground">Crescer 🎓</h1>
          <span className="text-sm text-foreground/60 font-medium">
            {current + 1}/{quizQuestions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-foreground/10 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-money rounded-full"
            animate={{ width: `${((current + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-surface rounded-card p-5 mb-4">
              <p className="text-lg font-bold text-card-foreground mb-4">{question.pergunta}</p>

              <div className="space-y-2">
                {question.opcoes.map((opt, i) => {
                  const isCorrect = i === question.respostaCorreta;
                  const isSelected = i === selected;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-button touch-target font-medium text-sm transition-all brand-bounce flex items-center gap-3 ${
                        !answered
                          ? 'bg-muted text-card-foreground hover:bg-muted/80'
                          : isCorrect
                          ? 'bg-money/20 text-money border-2 border-money'
                          : isSelected
                          ? 'bg-expense/20 text-expense border-2 border-expense'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {answered && isCorrect && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                      {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 flex-shrink-0" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-surface rounded-card p-4 mb-4"
              >
                <p className="text-sm text-card-foreground font-medium">{question.explicacao}</p>
              </motion.div>
            )}

            {answered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNext}
                className="w-full touch-target rounded-button bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 brand-bounce"
                whileTap={{ scale: 0.95 }}
              >
                {current < quizQuestions.length - 1 ? 'Próxima' : 'Ver resultado'} <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
