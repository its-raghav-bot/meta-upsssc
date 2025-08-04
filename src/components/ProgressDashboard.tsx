import { Subject, Topic } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Target, Clock } from "lucide-react";

interface ProgressDashboardProps {
  subjects: Subject[];
  recentTopics: Topic[];
}

export const ProgressDashboard = ({ subjects, recentTopics }: ProgressDashboardProps) => {
  const totalTopics = subjects.reduce((total, subject) => 
    total + subject.chapters.reduce((chapterTotal, chapter) => 
      chapterTotal + chapter.topics.length, 0), 0);
  
  const completedTopics = subjects.reduce((total, subject) => 
    total + subject.chapters.reduce((chapterTotal, chapter) => 
      chapterTotal + chapter.topics.filter(topic => topic.isCompleted).length, 0), 0);
  
  const overallProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  
  const todayRead = recentTopics.filter(topic => {
    if (!topic.lastRead) return false;
    const today = new Date();
    const lastRead = new Date(topic.lastRead);
    return today.toDateString() === lastRead.toDateString();
  }).length;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-1.5 h-full">
      {subjects.map(subject => {
        const subjectTotalTopics = subject.chapters.reduce((total, chapter) => 
          total + chapter.topics.length, 0);
        const subjectCompletedTopics = subject.chapters.reduce((total, chapter) => 
          total + chapter.topics.filter(topic => topic.isCompleted).length, 0);
        const subjectProgress = subjectTotalTopics > 0 ? 
          (subjectCompletedTopics / subjectTotalTopics) * 100 : 0;
        
        return (
          <Card key={subject.id} className="p-3 sm:p-2 h-[calc((100vh-180px)/6)] flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-base">{subject.icon}</span>
                  <span className="text-xs font-medium text-foreground line-clamp-1">{subject.name}</span>
                </div>
                <Badge variant={subjectProgress === 100 ? "default" : "secondary"} className={
                  subjectProgress === 100 ? "bg-success text-success-foreground text-xs" : "text-xs"
                }>
                  {Math.round(subjectProgress)}%
                </Badge>
              </div>
              <Progress value={subjectProgress} className="h-1.5" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};