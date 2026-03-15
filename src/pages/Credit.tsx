import { motion } from 'framer-motion';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { creditOptions } from '@/data/mockData';
import BottomNav from '@/components/BottomNav';

export default function Credit() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate('/dashboard')} className="touch-target flex items-center gap-1 text-foreground/70 mb-2">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <h1 className="text-2xl font-extrabold text-foreground mb-1 text-center">Crédito 💳</h1>
        <p className="text-foreground/60 text-sm mb-6 text-center">Opções especiais pra quem usa o Tá na Mão</p>

        <div className="space-y-4">
          {creditOptions.map((credit, i) => (
            <motion.div
              key={credit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="glass-surface rounded-card overflow-hidden"
            >
              {/* Card header with bank color */}
              <div
                className="p-4 flex items-center justify-between"
                style={{ background: `linear-gradient(135deg, ${credit.cor}, ${credit.cor}88)` }}
              >
                <div>
                  <p className="text-sm font-bold text-primary-foreground">{credit.banco}</p>
                  <p className="text-xs text-primary-foreground/80">{credit.nome}</p>
                </div>
                <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> {credit.beneficio}
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Taxa</span>
                  <span className="text-lg font-extrabold text-card-foreground">{credit.taxa}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{credit.descricao}</p>
                <button className="w-full touch-target rounded-button bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 brand-bounce">
                  Quero saber mais <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MEI info */}
        <motion.div
          className="glass-surface rounded-card p-5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-bold text-card-foreground mb-2">💡 Por que ter MEI?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✅ Taxas de crédito menores com CNPJ</li>
            <li>✅ Pode emitir nota fiscal</li>
            <li>✅ Contribui pro INSS (aposentadoria)</li>
            <li>✅ Acessa linhas de crédito exclusivas</li>
            <li>✅ O DAS custa menos de R$ 75/mês</li>
          </ul>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
