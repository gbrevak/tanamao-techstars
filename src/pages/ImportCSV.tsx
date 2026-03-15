import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

export default function ImportCSV() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleFile = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="touch-target flex items-center gap-1 text-foreground/70 mb-6">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-xl font-extrabold text-foreground mb-1">Importar CSV</h1>
          <p className="text-sm text-muted-foreground">Envie o extrato do seu banco em formato CSV.</p>
        </div>

        <label
          onClick={handleFile}
          className="block glass-surface rounded-card p-8 text-center cursor-pointer border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors brand-bounce"
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-bold text-card-foreground mb-1">Toque para selecionar arquivo</p>
          <p className="text-xs text-muted-foreground">.csv até 5MB</p>
        </label>
      </div>

      <BottomNav />

      {/* Maintenance Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
            >
              <div
                className="rounded-card p-6 text-center max-w-[300px]"
                style={{ background: 'hsla(150, 30%, 8%, 0.95)', border: '1px solid hsla(0, 0%, 100%, 0.12)' }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚧</span>
                </div>
                <p className="text-sm text-card-foreground mb-5 leading-relaxed">
                  Estamos trabalhando nesta feature ainda! Obrigado pelo interesse, te avisaremos quando estiver pronta :)
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-2.5 rounded-button bg-primary text-primary-foreground font-semibold text-sm brand-bounce"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
