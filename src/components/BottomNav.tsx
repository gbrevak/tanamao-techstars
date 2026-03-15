import { Home, TrendingUp, GraduationCap, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddMenu from '@/components/AddMenu';

const navItems = [
  { icon: Home, label: 'Início', path: '/dashboard' },
  { icon: TrendingUp, label: 'Fluxo', path: '/fluxo' },
  { key: 'center', isCenter: true },
  { icon: GraduationCap, label: 'Crescer', path: '/crescer' },
  { icon: CreditCard, label: 'Crédito', path: '/credito' },
] as const;

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-card px-2 pb-safe" style={{ background: 'hsla(150, 30%, 8%, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          if ('isCenter' in item && item.isCenter) {
            return <AddMenu key="center" />;
          }

          const navItem = item as { icon: typeof Home; label: string; path: string };
          const isActive = location.pathname === navItem.path;

          return (
            <button
              key={navItem.path}
              onClick={() => navigate(navItem.path)}
              className={`touch-target flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <navItem.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{navItem.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}