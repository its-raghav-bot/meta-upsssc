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
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Subject Progress */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">विषयवार प्रगति</h2>
        </div>
        
        <div className="space-y-3">
          {subjects.map(subject => {
            const subjectTotalTopics = subject.chapters.reduce((total, chapter) => 
              total + chapter.topics.length, 0);
            const subjectCompletedTopics = subject.chapters.reduce((total, chapter) => 
              total + chapter.topics.filter(topic => topic.isCompleted).length, 0);
            const subjectProgress = subjectTotalTopics > 0 ? 
              (subjectCompletedTopics / subjectTotalTopics) * 100 : 0;
            
            return (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{subject.icon}</span>
                    <span className="text-sm font-medium text-foreground">{subject.name}</span>
                  </div>
                  <Badge variant={subjectProgress === 100 ? "default" : "secondary"} className={
                    subjectProgress === 100 ? "bg-success text-success-foreground" : ""
                  }>
                    {Math.round(subjectProgress)}%
                  </Badge>
                </div>
                <Progress value={subjectProgress} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};