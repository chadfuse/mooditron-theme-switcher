
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeCardProps {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThemeCard = ({ name, color, isSelected, onClick }: ThemeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full p-6 rounded-lg transition-all duration-300",
        "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary",
        "glass card-gradient group"
      )}
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-white">{name}</span>
        {isSelected && (
          <Check className="w-5 h-5 text-white animate-fadeIn" />
        )}
      </div>
      <div className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none" />
    </button>
  );
};

export default ThemeCard;
