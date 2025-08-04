export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
  totalTopics?: number;
  completedTopics?: number;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  topics: Topic[];
  isCompleted?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  hindiName?: string; // Optional Hindi display name
  chapterId: string;
  content: string;
  type: 'text' | 'pdf';
  filePath?: string;
  isCompleted?: boolean;
  pdfUrl?: string;
  lastRead?: Date;
  bookmark?: boolean;
  tags?: string[];
}

export interface SearchResult {
  topic: Topic;
  chapter: Chapter;
  subject: Subject;
  matchText: string;
}

export interface UserProgress {
  subjectId: string;
  completedTopics: string[];
  totalTimeSpent: number;
  lastAccessed: Date;
  currentStreak: number;
}