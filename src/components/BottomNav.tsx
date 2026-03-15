import { Home, TrendingUp, GraduationCap, CreditCard, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Início', path: '/dashboard' },
  { icon: TrendingUp, label: 'Fluxo', path: '/fluxo' },
  { icon: Plus, label: '', path: '/adicionar', isCenter: true },
  { icon: GraduationCap, label: 'Crescer', path: '/crescer' },
  { icon: CreditCard, label: 'Crédito', path: '/credito' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-card px-2 pb-safe" style={{ background: 'hsla(150, 30%, 8%, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          if (item.isCenter) {
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="touch-target -mt-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-glow brand-bounce"
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-7 h-7 text-primary-foreground" />
              </motion.button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`touch-target flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
