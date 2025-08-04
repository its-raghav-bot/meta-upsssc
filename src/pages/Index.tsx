import { useState, useEffect } from "react";
import { useNotesData } from "@/hooks/useNotesData";
import { Header } from "@/components/Header";
import { SubjectCard } from "@/components/SubjectCard";
import { ChapterList } from "@/components/ChapterList";
import { TopicList } from "@/components/TopicList";
import { TopicContent } from "@/components/TopicContent";
import { SearchBar } from "@/components/SearchBar";

import { ProgressDashboard } from "@/components/ProgressDashboard";
import { AdminPanel } from "@/components/AdminPanel";
import { Subject, Chapter, Topic, SearchResult } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Search, BarChart3, Clock, Settings } from "lucide-react";

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
    view: 'subjects'
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminKeySequence, setAdminKeySequence] = useState<string[]>([]);

  // Admin key sequence detection (A-D-M-I-N)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const targetSequence = ['A', 'D', 'M', 'I', 'N'];
      
      setAdminKeySequence(prev => {
        const newSequence = [...prev, key].slice(-5); // Keep only last 5 keys
        
        if (newSequence.length === 5 && 
            newSequence.every((k, i) => k === targetSequence[i])) {
          setShowAdminPanel(true);
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Navigation functions
  const navigateHome = () => {
    setNavigation({ view: 'home' });
    setSearchQuery("");
    setSearchResults([]);
  };

  const navigateToSubjects = () => {
    setNavigation({ view: 'subjects' });
  };

  // Skip chapters, go directly to topics
  const navigateToTopics = (subject: Subject) => {
    // Get all topics from all chapters in the subject
    const allTopics = subject.chapters.flatMap(chapter => chapter.topics);
    const firstChapter = subject.chapters[0]; // Use first chapter as container
    
    setNavigation({ 
      view: 'topics',
      currentSubject: subject,
      currentChapter: { ...firstChapter, topics: allTopics }
    });
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
      case 'topics':
        navigateToSubjects();
        break;
      case 'content':
        if (navigation.currentSubject) {
          navigateToTopics(navigation.currentSubject);
        }
        break;
      case 'search':
      case 'progress':
        navigateToSubjects();
        break;
      default:
        navigateToSubjects();
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
        navigateToSubjects();
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
      case 'topics':
        return navigation.currentSubject?.name || 'विषय';
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
          <div className="space-y-3 sm:space-y-2.5">
            <div className="grid grid-cols-2 gap-2 sm:gap-1.5 h-full">
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => navigateToTopics(subject)}
                />
              ))}
            </div>
          </div>
        );

      case 'topics':
        return navigation.currentChapter ? (
          <div className="space-y-3 sm:space-y-2.5">
            <TopicList 
              topics={navigation.currentChapter.topics}
              onTopicClick={navigateToContent}
            />
          </div>
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
          <div className="space-y-3 sm:space-y-2.5">
            <ProgressDashboard 
              subjects={subjects} 
              recentTopics={getRecentTopics()} 
            />
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {navigation.view !== 'content' && (
        <Header 
          isDark={isDark}
          onThemeToggle={toggleTheme}
          title={getPageTitle()}
          showBackButton={navigation.view !== 'subjects'}
          onBack={navigation.view !== 'subjects' ? navigateBack : undefined}
        />
      )}
      
      {navigation.view !== 'content' && (
        <div className="p-4 sm:p-3">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      <main className="h-[calc(100vh-140px)] p-4 sm:p-3 pb-4 sm:pb-2 overflow-hidden">
        {renderContent()}
      </main>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex safe-area-inset-bottom">
          <button
            onClick={navigateToSubjects}
            className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-2 px-3 sm:px-2 text-sm sm:text-xs transition-all duration-200 tap-target min-h-[60px] sm:min-h-[48px] ${
              navigation.view === 'subjects' 
                ? 'text-primary bg-primary/10 border-t-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <span className="text-xl sm:text-lg mb-1 sm:mb-0.5">📚</span>
            <span className="font-hindi font-semibold">विषय</span>
          </button>
          
          <button
            onClick={navigateToProgress}
            className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-2 px-3 sm:px-2 text-sm sm:text-xs transition-all duration-200 tap-target min-h-[60px] sm:min-h-[48px] ${
              navigation.view === 'progress' 
                ? 'text-primary bg-primary/10 border-t-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <span className="text-xl sm:text-lg mb-1 sm:mb-0.5">📈</span>
            <span className="font-hindi font-semibold">प्रगति</span>
          </button>
        </div>
      </div>
      
      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
};

export default Index;
