import { Subject } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
  return (
    <Card 
      className="p-3 sm:p-2.5 tap-target cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 border-2 hover:border-primary/50 h-20 sm:h-16 flex items-center"
      onClick={onClick}
    >
      <div className="flex items-center gap-2.5 sm:gap-2 w-full">
        <div className="text-xl sm:text-lg flex-shrink-0">{subject.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-xs text-card-foreground line-clamp-2 leading-tight">
            {subject.name}
          </h3>
        </div>
      </div>
    </Card>
  );
};