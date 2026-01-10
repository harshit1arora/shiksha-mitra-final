import { cn } from "@/lib/utils";
import { Calculator, BookOpen, Microscope, Leaf, Globe } from "lucide-react";

type SubjectType = "maths" | "hindi" | "science" | "evs" | "social";

interface SubjectCardProps {
  subject: SubjectType;
  isSelected: boolean;
  onClick: () => void;
}

const subjectConfig = {
  maths: {
    label: "Maths",
    icon: Calculator,
    bgClass: "bg-subject-maths",
    accentClass: "text-subject-maths-accent",
    borderClass: "border-subject-maths-accent/30",
  },
  hindi: {
    label: "Hindi",
    icon: BookOpen,
    bgClass: "bg-subject-hindi",
    accentClass: "text-subject-hindi-accent",
    borderClass: "border-subject-hindi-accent/30",
  },
  science: {
    label: "Science",
    icon: Microscope,
    bgClass: "bg-subject-science",
    accentClass: "text-subject-science-accent",
    borderClass: "border-subject-science-accent/30",
  },
  evs: {
    label: "EVS",
    icon: Leaf,
    bgClass: "bg-subject-evs",
    accentClass: "text-subject-evs-accent",
    borderClass: "border-subject-evs-accent/30",
  },
  social: {
    label: "Social Science",
    icon: Globe,
    bgClass: "bg-subject-social",
    accentClass: "text-subject-social-accent",
    borderClass: "border-subject-social-accent/30",
  },
};

const SubjectCard = ({ subject, isSelected, onClick }: SubjectCardProps) => {
  const config = subjectConfig[subject];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
        "active:scale-95 w-full",
        config.bgClass,
        isSelected
          ? `ring-2 ring-offset-2 ring-offset-background ${config.borderClass.replace('/30', '')} shadow-md`
          : "hover:shadow-sm"
      )}
    >
      <Icon className={cn("w-8 h-8 mb-2", config.accentClass)} />
      <span className={cn("font-medium text-sm", config.accentClass)}>
        {config.label}
      </span>
    </button>
  );
};

export default SubjectCard;
