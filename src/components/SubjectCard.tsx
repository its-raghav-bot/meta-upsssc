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
      className="p-4 sm:p-3 tap-target cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-2 hover:border-primary/50 min-h-[88px] sm:min-h-[72px] flex items-center bg-gradient-to-br from-card to-card/90"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 sm:gap-2.5 w-full">
        <div className="text-2xl sm:text-xl flex-shrink-0 drop-shadow-sm">{subject.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-xs text-card-foreground line-clamp-2 leading-tight font-hindi">
            {subject.name}
          </h3>
        </div>
      </div>
    </Card>
  );
};