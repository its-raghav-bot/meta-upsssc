import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    topicName: '',
    file: null as File | null
  });
  // Predefined subjects and topics
  const predefinedSubjects = [
    'indian-history', 'national-movement', 'geography', 'indian-economy', 
    'constitution', 'general-science', 'hindi', 'english', 'mathematics', 
    'general-awareness', 'reasoning'
  ];

  const predefinedTopics: {[key: string]: string[]} = {
    'indian-history': [
      'indus-valley-civilization', 'vedic-civilization', 'buddhism', 'jainism',
      'mauryan-empire', 'gupta-empire', 'harshavardhan', 'rajput-era',
      'sultanate-era', 'mughal-empire', 'maratha-empire', 'british-rule-first-war',
      'social-economic-impact-british'
    ],
    'national-movement': [
      'early-resistance', 'sepoy-mutiny', 'congress-formation', 'partition-bengal',
      'swadeshi-movement', 'revolutionary-movement', 'gandhian-era', 'non-cooperation',
      'civil-disobedience', 'quit-india', 'freedom-fighters', 'independence-partition'
    ],
    'geography': [
      'earth-structure', 'landforms', 'climate-weather', 'rivers-lakes',
      'population-settlement', 'agriculture', 'industries', 'transport',
      'indian-physical', 'indian-climate', 'indian-rivers', 'world-continents'
    ],
    'indian-economy': [
      'economic-development', 'planning-commission', 'five-year-plans', 'agriculture-sector',
      'industrial-sector', 'service-sector', 'banking-finance', 'monetary-policy',
      'fiscal-policy', 'trade-commerce', 'economic-reforms', 'current-challenges'
    ],
    'constitution': [
      'making-constitution', 'preamble', 'fundamental-rights', 'fundamental-duties',
      'directive-principles', 'union-government', 'parliament', 'president',
      'prime-minister', 'judiciary', 'supreme-court', 'state-government',
      'local-government', 'emergency-provisions', 'amendments'
    ],
    'general-science': [
      'mechanics', 'heat-thermodynamics', 'light-optics', 'electricity',
      'atomic-structure', 'periodic-table', 'acids-bases', 'metals-nonmetals',
      'cell-biology', 'human-body', 'plant-biology', 'genetics',
      'ecology-environment', 'natural-resources', 'pollution-control'
    ],
    'hindi': [
      'vyakaran-basics', 'sandhi', 'samas', 'chhand-alankar',
      'kavya-sahitya', 'katha-sahitya', 'natak-sahitya', 'nibandh-sahitya',
      'gadyansh', 'kavyansh', 'patra-lekhan', 'nibandh-lekhan'
    ],
    'english': [
      'parts-of-speech', 'tenses', 'voice-narration', 'sentence-structure',
      'vocabulary-building', 'synonyms-antonyms', 'idioms-phrases', 'one-word-substitution',
      'reading-comprehension', 'cloze-test', 'error-correction', 'essay-writing'
    ],
    'mathematics': [
      'number-system', 'percentage', 'profit-loss', 'simple-compound-interest',
      'time-work', 'time-distance', 'averages', 'ratio-proportion',
      'algebra-basics', 'linear-equations', 'geometry-basics', 'mensuration',
      'trigonometry', 'statistics-basics', 'probability', 'data-interpretation'
    ],
    'general-awareness': [
      'current-affairs-national', 'current-affairs-international', 'government-schemes',
      'awards-honours', 'sports-events', 'books-authors', 'important-days',
      'organizations', 'capitals-currencies', 'indian-states', 'world-geography-facts',
      'science-technology', 'defence-security', 'economy-finance'
    ],
    'reasoning': [
      'verbal-analogy', 'classification', 'series-completion', 'coding-decoding',
      'blood-relations', 'direction-distance', 'ranking-arrangement', 'syllogism',
      'statement-conclusion', 'statement-assumption', 'critical-reasoning',
      'puzzles-seating', 'calendar-clock', 'number-series', 'figure-series',
      'pattern-completion', 'mirror-water-images', 'paper-cutting-folding'
    ]
  };

  const [existingSubjects, setExistingSubjects] = useState<string[]>(predefinedSubjects);
  const [existingTopics, setExistingTopics] = useState<{[key: string]: string[]}>(predefinedTopics);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, file }));
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload only PDF files",
        variant: "destructive"
      });
    }
  };

  const getSubjectDisplayName = (subjectId: string) => {
    const subjectNames: {[key: string]: string} = {
      'indian-history': 'Indian History',
      'national-movement': 'National Movement',
      'geography': 'Geography',
      'indian-economy': 'Indian Economy',
      'constitution': 'Constitution',
      'general-science': 'General Science',
      'hindi': 'Hindi',
      'english': 'English',
      'mathematics': 'Mathematics',
      'general-awareness': 'General Awareness',
      'reasoning': 'Reasoning'
    };
    return subjectNames[subjectId] || subjectId;
  };

  const getTopicDisplayName = (topicId: string) => {
    const topicNames: {[key: string]: string} = {
      // Indian History
      'indus-valley-civilization': 'Indus Valley Civilization',
      'vedic-civilization': 'Vedic Civilization',
      'buddhism': 'Buddhism',
      'jainism': 'Jainism',
      'mauryan-empire': 'Mauryan Empire',
      'gupta-empire': 'Gupta Empire',
      'harshavardhan': 'Harshavardhan',
      'rajput-era': 'Rajput Era',
      'sultanate-era': 'Sultanate Era',
      'mughal-empire': 'Mughal Empire',
      'maratha-empire': 'Maratha Empire',
      'british-rule-first-war': 'British Rule and First War of Independence',
      'social-economic-impact-british': 'Social and Economic Impact of British Rule',
      
      // National Movement
      'early-resistance': 'Early Resistance',
      'sepoy-mutiny': 'Sepoy Mutiny',
      'congress-formation': 'Formation of Congress',
      'partition-bengal': 'Partition of Bengal',
      'swadeshi-movement': 'Swadeshi Movement',
      'revolutionary-movement': 'Revolutionary Movement',
      'gandhian-era': 'Gandhian Era',
      'non-cooperation': 'Non-Cooperation Movement',
      'civil-disobedience': 'Civil Disobedience',
      'quit-india': 'Quit India Movement',
      'freedom-fighters': 'Freedom Fighters',
      'independence-partition': 'Independence and Partition',
      
      // Geography
      'earth-structure': 'Earth Structure',
      'landforms': 'Landforms',
      'climate-weather': 'Climate and Weather',
      'rivers-lakes': 'Rivers and Lakes',
      'population-settlement': 'Population and Settlement',
      'agriculture': 'Agriculture',
      'industries': 'Industries',
      'transport': 'Transport',
      'indian-physical': 'Physical Features of India',
      'indian-climate': 'Climate of India',
      'indian-rivers': 'Rivers of India',
      'world-continents': 'World Continents',
      
      // Economy
      'economic-development': 'Economic Development',
      'planning-commission': 'Planning Commission',
      'five-year-plans': 'Five Year Plans',
      'agriculture-sector': 'Agriculture Sector',
      'industrial-sector': 'Industrial Sector',
      'service-sector': 'Service Sector',
      'banking-finance': 'Banking and Finance',
      'monetary-policy': 'Monetary Policy',
      'fiscal-policy': 'Fiscal Policy',
      'trade-commerce': 'Trade and Commerce',
      'economic-reforms': 'Economic Reforms',
      'current-challenges': 'Current Challenges',
      
      // Constitution
      'making-constitution': 'Making of Constitution',
      'preamble': 'Preamble',
      'fundamental-rights': 'Fundamental Rights',
      'fundamental-duties': 'Fundamental Duties',
      'directive-principles': 'Directive Principles',
      'union-government': 'Union Government',
      'parliament': 'Parliament',
      'president': 'President',
      'prime-minister': 'Prime Minister',
      'judiciary': 'Judiciary',
      'supreme-court': 'Supreme Court',
      'state-government': 'State Government',
      'local-government': 'Local Government',
      'emergency-provisions': 'Emergency Provisions',
      'amendments': 'Amendments',
      
      // Science
      'mechanics': 'Mechanics',
      'heat-thermodynamics': 'Heat and Thermodynamics',
      'light-optics': 'Light and Optics',
      'electricity': 'Electricity',
      'atomic-structure': 'Atomic Structure',
      'periodic-table': 'Periodic Table',
      'acids-bases': 'Acids and Bases',
      'metals-nonmetals': 'Metals and Non-metals',
      'cell-biology': 'Cell Biology',
      'human-body': 'Human Body',
      'plant-biology': 'Plant Biology',
      'genetics': 'Genetics',
      'ecology-environment': 'Ecology and Environment',
      'natural-resources': 'Natural Resources',
      'pollution-control': 'Pollution Control',
      
      // Hindi
      'vyakaran-basics': 'Grammar Basics',
      'sandhi': 'Sandhi',
      'samas': 'Compound Words',
      'chhand-alankar': 'Meter and Figures of Speech',
      'kavya-sahitya': 'Poetry Literature',
      'katha-sahitya': 'Story Literature',
      'natak-sahitya': 'Drama Literature',
      'nibandh-sahitya': 'Essay Literature',
      'gadyansh': 'Prose Passage',
      'kavyansh': 'Poetry Passage',
      'patra-lekhan': 'Letter Writing',
      'nibandh-lekhan': 'Essay Writing',
      
      // English
      'parts-of-speech': 'Parts of Speech',
      'tenses': 'Tenses',
      'voice-narration': 'Voice and Narration',
      'sentence-structure': 'Sentence Structure',
      'vocabulary-building': 'Vocabulary Building',
      'synonyms-antonyms': 'Synonyms and Antonyms',
      'idioms-phrases': 'Idioms and Phrases',
      'one-word-substitution': 'One Word Substitution',
      'reading-comprehension': 'Reading Comprehension',
      'cloze-test': 'Cloze Test',
      'error-correction': 'Error Correction',
      'essay-writing': 'Essay Writing',
      
      // Math
      'number-system': 'Number System',
      'percentage': 'Percentage',
      'profit-loss': 'Profit and Loss',
      'simple-compound-interest': 'Simple and Compound Interest',
      'time-work': 'Time and Work',
      'time-distance': 'Time and Distance',
      'averages': 'Averages',
      'ratio-proportion': 'Ratio and Proportion',
      'algebra-basics': 'Algebra Basics',
      'linear-equations': 'Linear Equations',
      'geometry-basics': 'Geometry Basics',
      'mensuration': 'Mensuration',
      'trigonometry': 'Trigonometry',
      'statistics-basics': 'Statistics Basics',
      'probability': 'Probability',
      'data-interpretation': 'Data Interpretation',
      
      // GK
      'current-affairs-national': 'National Current Affairs',
      'current-affairs-international': 'International Current Affairs',
      'government-schemes': 'Government Schemes',
      'awards-honours': 'Awards and Honours',
      'sports-events': 'Sports Events',
      'books-authors': 'Books and Authors',
      'important-days': 'Important Days',
      'organizations': 'Organizations',
      'capitals-currencies': 'Capitals and Currencies',
      'indian-states': 'Indian States',
      'world-geography-facts': 'World Geography Facts',
      'science-technology': 'Science and Technology',
      'defence-security': 'Defence and Security',
      'economy-finance': 'Economy and Finance',
      
      // Reasoning
      'verbal-analogy': 'Verbal Analogy',
      'classification': 'Classification',
      'series-completion': 'Series Completion',
      'coding-decoding': 'Coding-Decoding',
      'blood-relations': 'Blood Relations',
      'direction-distance': 'Direction and Distance',
      'ranking-arrangement': 'Ranking and Arrangement',
      'syllogism': 'Syllogism',
      'statement-conclusion': 'Statement and Conclusion',
      'statement-assumption': 'Statement and Assumption',
      'critical-reasoning': 'Critical Reasoning',
      'puzzles-seating': 'Puzzles and Seating Arrangement',
      'calendar-clock': 'Calendar and Clock',
      'number-series': 'Number Series',
      'figure-series': 'Figure Series',
      'pattern-completion': 'Pattern Completion',
      'mirror-water-images': 'Mirror and Water Images',
      'paper-cutting-folding': 'Paper Cutting and Folding'
    };
    return topicNames[topicId] || topicId;
  };

  const handleUpload = async () => {
    if (!formData.file || !formData.subject || !formData.topicName) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all fields and select a file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Generate unique file path  
      const fileName = `${Date.now()}-${formData.file.name}`;
      const filePath = `${formData.subject}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, formData.file);

      if (uploadError) throw uploadError;

      // Get topic title
      const topicTitle = getTopicDisplayName(formData.topicName);

      // Save metadata to Supabase database
      const { error: dbError } = await supabase
        .from('notes')
        .insert({
          subject_id: formData.subject,
          chapter_id: formData.topicName,
          topic_id: formData.topicName,
          title: topicTitle,
          content: `PDF Document: ${topicTitle}`,
          file_path: filePath, // Store the actual file path
          user_id: '00000000-0000-0000-0000-000000000000'
        });

      if (dbError) throw dbError;

      toast({
        title: "Successfully Uploaded",
        description: "PDF notes uploaded successfully"
      });

      // Reset form
      setFormData({ subject: '', topicName: '', file: null });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Error",
        description: "Problem uploading PDF",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Panel - PDF Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Select Subject</Label>
            <Select value={formData.subject} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, subject: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                {loading ? (
                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                ) : existingSubjects.length === 0 ? (
                  <SelectItem value="no-data" disabled>No subjects available</SelectItem>
                ) : (
                  existingSubjects.map(subject => (
                    <SelectItem key={subject} value={subject} className="hover:bg-accent">
                      {getSubjectDisplayName(subject)}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="topic">Select Topic</Label>
            <Select 
              value={formData.topicName} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, topicName: value }))}
              disabled={!formData.subject}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select subject first" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                {!formData.subject ? (
                  <SelectItem value="no-subject" disabled>Select subject first</SelectItem>
                ) : existingTopics[formData.subject]?.length === 0 ? (
                  <SelectItem value="no-topics" disabled>No topics in this subject</SelectItem>
                ) : (
                  existingTopics[formData.subject]?.map(topic => (
                    <SelectItem key={topic} value={topic} className="hover:bg-accent">
                      {getTopicDisplayName(topic)}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Select PDF File</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};