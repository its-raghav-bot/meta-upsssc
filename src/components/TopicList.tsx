import { Topic } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, FileText, Bookmark } from "lucide-react";

interface TopicListProps {
  topics: Topic[];
  onTopicClick: (topic: Topic) => void;
}

export const TopicList = ({ topics, onTopicClick }: TopicListProps) => {
  return (
    <div className="space-y-3">
      {topics.map((topic) => {
        return (
          <Card 
            key={topic.id}
            className={`p-4 tap-target cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98 border ${
              topic.isCompleted ? 'bg-success/5 border-success/20' : 'hover:border-primary/30'
            }`}
            onClick={() => onTopicClick(topic)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {topic.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-medium text-hindi-lg truncate ${
                    topic.isCompleted ? 'text-success line-through' : 'text-card-foreground'
                  }`}>
                    {topic.name}
                  </h3>
                  {topic.bookmark && (
                    <Bookmark className="w-4 h-4 text-warning fill-current" />
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-3 h-3" />
                  <span>{topic.type === 'pdf' ? 'PDF फाइल' : 'टेक्स्ट नोट्स'}</span>
                  {topic.lastRead && (
                    <>
                      <span>•</span>
                      <span>पिछली बार पढ़ा: {new Date(topic.lastRead).toLocaleDateString('hi-IN')}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {topic.isCompleted ? (
                  <Badge variant="default" className="bg-success text-success-foreground text-xs">
                    पूर्ण
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
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