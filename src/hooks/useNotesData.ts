import { useState, useEffect } from "react";
import { Subject, Topic, SearchResult } from "@/types/notes";
import { subjects as initialSubjects } from "@/data/subjects";

export const useNotesData = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [isDark, setIsDark] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem('pet-gyan-subjects');
    const savedTheme = localStorage.getItem('pet-gyan-theme');
    
    if (savedSubjects) {
      try {
        setSubjects(JSON.parse(savedSubjects));
      } catch (error) {
        console.error('Error loading saved subjects:', error);
      }
    }
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem('pet-gyan-subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Apply theme
  useEffect(() => {
    localStorage.setItem('pet-gyan-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const toggleTopicComplete = (topicId: string) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => ({
        ...subject,
        chapters: subject.chapters.map(chapter => ({
          ...chapter,
          topics: chapter.topics.map(topic => 
            topic.id === topicId 
              ? { 
                  ...topic, 
                  isCompleted: !topic.isCompleted,
                  lastRead: new Date()
                }
              : topic
          )
        }))
      }))
    );
  };


  const updateTopicLastRead = (topicId: string) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => ({
        ...subject,
        chapters: subject.chapters.map(chapter => ({
          ...chapter,
          topics: chapter.topics.map(topic => 
            topic.id === topicId 
              ? { ...topic, lastRead: new Date() }
              : topic
          )
        }))
      }))
    );
  };

  const searchTopics = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    subjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        chapter.topics.forEach(topic => {
          const matchInName = topic.name.toLowerCase().includes(searchTerm);
          const matchInContent = topic.content.toLowerCase().includes(searchTerm);
          
          if (matchInName || matchInContent) {
            const matchText = matchInName 
              ? topic.name 
              : topic.content.substring(0, 100) + '...';
            
            results.push({
              topic,
              chapter,
              subject,
              matchText
            });
          }
        });
      });
    });

    return results;
  };

  const getRecentTopics = (limit: number = 5): Topic[] => {
    const allTopics: Topic[] = [];
    subjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        chapter.topics.forEach(topic => {
          if (topic.lastRead) {
            allTopics.push(topic);
          }
        });
      });
    });

    return allTopics
      .sort((a, b) => 
        new Date(b.lastRead!).getTime() - new Date(a.lastRead!).getTime()
      )
      .slice(0, limit);
  };


  const getSubjectById = (subjectId: string) => {
    return subjects.find(subject => subject.id === subjectId);
  };

  const getChapterById = (chapterId: string) => {
    for (const subject of subjects) {
      const chapter = subject.chapters.find(ch => ch.id === chapterId);
      if (chapter) return chapter;
    }
    return null;
  };

  const getTopicById = (topicId: string) => {
    for (const subject of subjects) {
      for (const chapter of subject.chapters) {
        const topic = chapter.topics.find(t => t.id === topicId);
        if (topic) return topic;
      }
    }
    return null;
  };

  return {
    subjects,
    isDark,
    toggleTheme,
    toggleTopicComplete,
    updateTopicLastRead,
    searchTopics,
    getRecentTopics,
    getSubjectById,
    getChapterById,
    getTopicById
  };
};