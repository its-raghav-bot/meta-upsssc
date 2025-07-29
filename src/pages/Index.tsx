import { useState } from "react";
import { useNotesData } from "@/hooks/useNotesData";
import { Header } from "@/components/Header";
import { SubjectCard } from "@/components/SubjectCard";
import { ChapterList } from "@/components/ChapterList";
import { TopicList } from "@/components/TopicList";
import { TopicContent } from "@/components/TopicContent";
import { SearchBar } from "@/components/SearchBar";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { Subject, Chapter, Topic, SearchResult } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Search, BarChart3, Clock } from "lucide-react";

type ViewType = 'home' | 'subjects' | 'chapters' | 'topics' | 'content' | 'search' | 'progress';

interface NavigationState {
  view: ViewType;
  currentSubject?: Subject;
  currentChapter?: Chapter;
  currentTopic?: Topic;
}

const Index = () => {
  const {
    subjects,
    isDark,
    toggleTheme,
    toggleTopicComplete,
    updateTopicLastRead,
    searchTopics,
    getRecentTopics
  } = useNotesData();

  const [navigation, setNavigation] = useState<NavigationState>({
    view: 'home'
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Navigation functions
  const navigateHome = () => {
    setNavigation({ view: 'home' });
    setSearchQuery("");
    setSearchResults([]);
  };

  const navigateToSubjects = () => {
    setNavigation({ view: 'subjects' });
  };

  const navigateToChapters = (subject: Subject) => {
    setNavigation({ 
      view: 'chapters',
      currentSubject: subject 
    });
  };

  const navigateToTopics = (chapter: Chapter) => {
    setNavigation(prev => ({
      view: 'topics',
      currentSubject: prev.currentSubject,
      currentChapter: chapter
    }));
  };

  const navigateToContent = (topic: Topic) => {
    updateTopicLastRead(topic.id);
    setNavigation(prev => ({
      view: 'content',
      currentSubject: prev.currentSubject,
      currentChapter: prev.currentChapter,
      currentTopic: topic
    }));
  };

  const navigateBack = () => {
    switch (navigation.view) {
      case 'subjects':
        navigateHome();
        break;
      case 'chapters':
        navigateToSubjects();
        break;
      case 'topics':
        if (navigation.currentSubject) {
          navigateToChapters(navigation.currentSubject);
        }
        break;
      case 'content':
        if (navigation.currentChapter) {
          navigateToTopics(navigation.currentChapter);
        }
        break;
      case 'search':
      case 'progress':
        navigateHome();
        break;
      default:
        navigateHome();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchTopics(query);
      setSearchResults(results);
      setNavigation({ view: 'search' });
    } else {
      setSearchResults([]);
      if (navigation.view === 'search') {
        navigateHome();
      }
    }
  };

  const navigateToProgress = () => {
    setNavigation({ view: 'progress' });
  };


  // Get page title
  const getPageTitle = () => {
    switch (navigation.view) {
      case 'subjects':
        return 'सभी विषय';
      case 'chapters':
        return navigation.currentSubject?.name || 'अध्याय';
      case 'topics':
        return navigation.currentChapter?.name || 'विषय';
      case 'content':
        return navigation.currentTopic?.name || 'नोट्स';
      case 'search':
        return 'खोज परिणाम';
      case 'progress':
        return 'प्रगति रिपोर्ट';
      default:
        return 'PET Gyan';
    }
  };

  // Render content based on current view
  const renderContent = () => {
    switch (navigation.view) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <ProgressDashboard 
              subjects={subjects} 
              recentTopics={getRecentTopics()} 
            />
            
            {/* Recent Topics */}
            {getRecentTopics(3).length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">हाल में पढ़े गए</h2>
                  <Button variant="ghost" size="sm">सभी देखें</Button>
                </div>
                <div className="space-y-3">
                  {getRecentTopics(3).map(topic => (
                    <Card key={topic.id} className="p-3 cursor-pointer hover:bg-accent/50" 
                          onClick={() => navigateToContent(topic)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{topic.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {topic.lastRead && new Date(topic.lastRead).toLocaleDateString('hi-IN')}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">पढ़ें</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={navigateToSubjects} className="h-20 flex-col gap-2">
                <Home className="w-6 h-6" />
                <span>सभी विषय</span>
              </Button>
            </div>
          </div>
        );

      case 'subjects':
        return (
          <div className="space-y-4">
            {subjects.map(subject => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => navigateToChapters(subject)}
              />
            ))}
          </div>
        );

      case 'chapters':
        return navigation.currentSubject ? (
          <ChapterList 
            chapters={navigation.currentSubject.chapters}
            onChapterClick={navigateToTopics}
          />
        ) : null;

      case 'topics':
        return navigation.currentChapter ? (
          <TopicList 
            topics={navigation.currentChapter.topics}
            onTopicClick={navigateToContent}
          />
        ) : null;

      case 'content':
        return navigation.currentTopic ? (
          <TopicContent
            topic={navigation.currentTopic}
            onBack={navigateBack}
            onToggleComplete={toggleTopicComplete}
          />
        ) : null;

      case 'search':
        return (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              "{searchQuery}" के लिए {searchResults.length} परिणाम मिले
            </div>
            {searchResults.map((result, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:shadow-md" 
                    onClick={() => navigateToContent(result.topic)}>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">{result.topic.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {result.matchText}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline">{result.subject.name}</Badge>
                    <span>•</span>
                    <span>{result.chapter.name}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'progress':
        return (
          <ProgressDashboard 
            subjects={subjects} 
            recentTopics={getRecentTopics()} 
          />
        );


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {navigation.view === 'content' ? (
        renderContent()
      ) : (
        <>
          <Header 
            isDark={isDark}
            onThemeToggle={toggleTheme}
            title={getPageTitle()}
            showBackButton={navigation.view !== 'home'}
            onBack={navigation.view !== 'home' ? navigateBack : undefined}
          />
          
          <div className="p-4 space-y-6">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Bottom Navigation - Always visible */}
            <div className="fixed bottom-4 left-4 right-4 z-10">
              <Card className="p-3">
                <div className="flex items-center justify-around">
                  <Button variant="ghost" size="sm" onClick={navigateHome} className="flex-col gap-1">
                    <Home className="w-4 h-4" />
                    <span className="text-xs">होम</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={navigateToSubjects} className="flex-col gap-1">
                    <Search className="w-4 h-4" />
                    <span className="text-xs">विषय</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={navigateToProgress} className="flex-col gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-xs">प्रगति</span>
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="pb-24">
              {renderContent()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
