import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

export default function ImportCSV() {
  const navigate = useNavigate();

  const handleFile = () => {
    toast.success('CSV importado com sucesso! ✅');
    setTimeout(() => navigate('/dashboard'), 1200);
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
    </div>
  );
}
