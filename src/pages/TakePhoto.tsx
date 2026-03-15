import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { toast } from 'sonner';
import BottomNav from '@/components/BottomNav';

export default function TakePhoto() {
  const navigate = useNavigate();

  const handleCapture = () => {
    toast.info('🔧 Essa feature está em manutenção. Volte em breve!');
  };

  return (
    <div className="min-h-screen gradient-bg pb-24">
      <div className="px-4 pt-6">
        <button onClick={() => navigate(-1)} className="touch-target flex items-center gap-1 text-foreground/70 mb-6">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-money/20 flex items-center justify-center mx-auto mb-3">
            <Camera className="w-8 h-8 text-money" />
          </div>
          <h1 className="text-xl font-extrabold text-foreground mb-1">Tirar Foto</h1>
          <p className="text-sm text-muted-foreground">Fotografe um recibo ou nota fiscal para registrar automaticamente.</p>
        </div>

        <button
          onClick={handleCapture}
          className="w-full glass-surface rounded-card p-8 text-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors brand-bounce"
        >
          <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-bold text-card-foreground mb-1">Toque para abrir a câmera</p>
          <p className="text-xs text-muted-foreground">JPG, PNG até 10MB</p>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
