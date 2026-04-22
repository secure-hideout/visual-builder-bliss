import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InfoIconButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick ? onClick : () => navigate('/info')}
      aria-label="About BeingHomeFoods"
      title="About"
      className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 active:scale-90 bg-white/5 border border-white/20 backdrop-blur-md hover:border-primary/50 hover:bg-white/10"
    >
      <Info className="w-4 h-4 text-white group-hover:text-primary transition-colors" strokeWidth={2.5} />
    </button>
  );
}
