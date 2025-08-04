import { Topic } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, FileText, Bookmark } from "lucide-react";
import { getTopicDisplayName } from "@/utils/topicDisplay";

interface TopicListProps {
  topics: Topic[];
  onTopicClick: (topic: Topic) => void;
}

export const TopicList = ({ topics, onTopicClick }: TopicListProps) => {
  return (
    <div className="space-y-2">
      {topics.map((topic) => {
        return (
          <Card 
            key={topic.id}
            className={`p-3 sm:p-2.5 tap-target cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98 border ${
              topic.isCompleted ? 'bg-success/5 border-success/20' : 'hover:border-primary/30'
            }`}
            onClick={() => onTopicClick(topic)}
          >
            <div className="flex items-center gap-2.5 sm:gap-2">
              <div className="flex-shrink-0">
                {topic.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 sm:w-4 sm:h-4 text-success" />
                ) : (
                  <Circle className="w-5 h-5 sm:w-4 sm:h-4 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 sm:mb-0.5">
                  <h3 className={`font-medium text-base sm:text-sm truncate font-hindi ${
                    topic.isCompleted ? 'text-success line-through' : 'text-card-foreground'
                  }`}>
                    {getTopicDisplayName(topic, 'display')}
                  </h3>
                  {topic.bookmark && (
                    <Bookmark className="w-4 h-4 sm:w-3 sm:h-3 text-warning fill-current" />
                  )}
                </div>
                
                {topic.lastRead && (
                  <div className="flex items-center gap-1.5 text-sm sm:text-xs text-muted-foreground">
                    <span>पिछली बार: {new Date(topic.lastRead).toLocaleDateString('hi-IN')}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {topic.isCompleted ? (
                  <Badge variant="default" className="bg-success text-success-foreground text-xs sm:text-[10px] px-2 sm:px-1.5 py-1 sm:py-0.5">
                    पूर्ण
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs sm:text-[10px] px-2 sm:px-1.5 py-1 sm:py-0.5">
                    पढ़ें
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