import { Subject } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
  const totalTopics = subject.chapters.reduce((total, chapter) => total + chapter.topics.length, 0);
  const completedTopics = subject.chapters.reduce((total, chapter) => 
    total + chapter.topics.filter(topic => topic.isCompleted).length, 0
  );
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <Card 
      className="p-4 tap-target cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 border-2 hover:border-primary/50"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{subject.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-hindi-lg text-card-foreground mb-2 line-clamp-2">
            {subject.name}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{completedTopics}/{totalTopics} विषय पूर्ण</span>
              <span>{Math.round(progress)}%</span>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-success" />
                <span>{completedTopics} पूर्ण</span>
              </div>
              <div className="flex items-center gap-1">
                <Circle className="w-3 h-3 text-warning" />
                <span>{totalTopics - completedTopics} बाकी</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};