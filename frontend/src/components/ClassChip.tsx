import { cn } from "@/lib/utils";

interface ClassChipProps {
  classNumber: number;
  isSelected: boolean;
  onClick: () => void;
}

const ClassChip = ({ classNumber, isSelected, onClick }: ClassChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-11 w-11 rounded-full font-semibold text-base transition-all duration-200",
        "flex items-center justify-center",
        "active:scale-95",
        isSelected
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card text-foreground border border-border hover:border-primary/30"
      )}
    >
      {classNumber}
    </button>
  );
};

export default ClassChip;
