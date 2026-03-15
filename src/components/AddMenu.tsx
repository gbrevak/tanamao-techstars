import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Landmark, FileSpreadsheet, PenLine, Camera } from 'lucide-react';

const menuItems = [
  { icon: Landmark, label: 'OpenFinance', path: '/openfinance', color: 'bg-primary' },
  { icon: Camera, label: 'Tirar Foto', path: '/tirar-foto', color: 'bg-money' },
  { icon: FileSpreadsheet, label: 'Importar CSV', path: '/importar-csv', color: 'bg-accent' },
  { icon: PenLine, label: 'Manual', path: '/adicionar', color: 'bg-money' },
];

export default function AddMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu items */}
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
            {menuItems.map((item, i) => (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.06, type: 'spring', bounce: 0.3 }}
                onClick={() => { setOpen(false); navigate(item.path); }}
                className="flex items-center gap-3 rounded-button px-5 py-3 min-w-[180px] brand-bounce"
                style={{ background: 'hsla(150, 30%, 8%, 0.92)', border: '1px solid hsla(0, 0%, 100%, 0.12)' }}
              >
                <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-bold text-card-foreground">{item.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="touch-target -mt-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg z-50 brand-bounce"
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: 'spring', bounce: 0.3 }}
      >
        <Plus className="w-7 h-7 text-primary-foreground" />
      </motion.button>
    </>
  );
}
