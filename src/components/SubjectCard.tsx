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
      className="p-4 tap-target cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 border-2 hover:border-primary/50 h-24 flex items-center"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="text-2xl">{subject.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-card-foreground line-clamp-2 leading-tight">
            {subject.name}
          </h3>
        </div>
      </div>
    </Card>
  );
};