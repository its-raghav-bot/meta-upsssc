import { Chapter } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, BookOpen } from "lucide-react";

interface ChapterListProps {
  chapters: Chapter[];
  onChapterClick: (chapter: Chapter) => void;
}

export const ChapterList = ({ chapters, onChapterClick }: ChapterListProps) => {
  return (
    <div className="space-y-3">
      {chapters.map((chapter) => {
        const totalTopics = chapter.topics.length;
        const completedTopics = chapter.topics.filter(topic => topic.isCompleted).length;
        const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
        
        return (
          <Card 
            key={chapter.id}
            className="p-4 tap-target cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98 border hover:border-primary/30"
            onClick={() => onChapterClick(chapter)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-medium text-hindi-lg text-card-foreground truncate">
                    {chapter.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{totalTopics} विषय</span>
                  <span>•</span>
                  <span>{completedTopics} पूर्ण</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-2">
                {progress === 100 ? (
                  <Badge variant="default" className="bg-success text-success-foreground">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    पूर्ण
                  </Badge>
                ) : progress > 0 ? (
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                    <Clock className="w-3 h-3 mr-1" />
                    {Math.round(progress)}%
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    शुरू करें
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};