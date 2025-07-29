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
  const [existingSubjects, setExistingSubjects] = useState<string[]>([]);
  const [existingTopics, setExistingTopics] = useState<{[key: string]: string[]}>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExistingData();
  }, []);

  const fetchExistingData = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('subject_id, topic_id, title');
      
      if (error) throw error;

      const subjects = new Set<string>();
      const topicsBySubject: {[key: string]: string[]} = {};

      data?.forEach(note => {
        subjects.add(note.subject_id);
        if (!topicsBySubject[note.subject_id]) {
          topicsBySubject[note.subject_id] = [];
        }
        if (!topicsBySubject[note.subject_id].includes(note.topic_id)) {
          topicsBySubject[note.subject_id].push(note.topic_id);
        }
      });

      setExistingSubjects(Array.from(subjects));
      setExistingTopics(topicsBySubject);
    } catch (error) {
      console.error('Error fetching existing data:', error);
      toast({
        title: "डेटा लोड एरर",
        description: "मौजूदा विषय और टॉपिक लोड नहीं हो सके",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, file }));
    } else {
      toast({
        title: "गलत फ़ाइल",
        description: "कृपया केवल PDF फ़ाइल अपलोड करें",
        variant: "destructive"
      });
    }
  };

  const getSubjectDisplayName = (subjectId: string) => {
    const subjectNames: {[key: string]: string} = {
      'indian-history': 'भारतीय इतिहास',
      'national-movement': 'राष्ट्रीय आंदोलन',
      'geography': 'भूगोल',
      'indian-economy': 'भारतीय अर्थव्यवस्था',
      'constitution': 'संविधान',
      'general-science': 'सामान्य विज्ञान',
      'hindi': 'हिंदी',
      'english': 'अंग्रेजी',
      'mathematics': 'गणित',
      'general-awareness': 'सामान्य जागरूकता',
      'reasoning': 'तर्कशक्ति'
    };
    return subjectNames[subjectId] || subjectId;
  };

  const getTopicDisplayName = async (topicId: string, subjectId: string) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('title')
        .eq('topic_id', topicId)
        .eq('subject_id', subjectId)
        .limit(1);
      
      if (error) throw error;
      return data?.[0]?.title || topicId;
    } catch (error) {
      console.error('Error fetching topic name:', error);
      return topicId;
    }
  };

  const handleUpload = async () => {
    if (!formData.file || !formData.subject || !formData.topicName) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी फील्ड भरें और फ़ाइल चुनें",
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

      // Get existing topic title
      const topicTitle = await getTopicDisplayName(formData.topicName, formData.subject);

      // Save metadata to Supabase database
      const { error: dbError } = await supabase
        .from('notes')
        .insert({
          subject_id: formData.subject,
          chapter_id: formData.topicName,
          topic_id: formData.topicName,
          title: topicTitle,
          content: `PDF Document: ${topicTitle}`,
          user_id: '00000000-0000-0000-0000-000000000000'
        });

      if (dbError) throw dbError;

      toast({
        title: "सफलतापूर्वक अपलोड",
        description: "PDF नोट्स सफलतापूर्वक अपलोड हो गए"
      });

      // Reset form
      setFormData({ subject: '', topicName: '', file: null });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "अपलोड एरर",
        description: "PDF अपलोड करने में समस्या हुई",
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
          <CardTitle className="text-center">एडमिन पैनल - PDF अपलोड</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">विषय चुनें</Label>
            <Select value={formData.subject} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, subject: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="विषय चुनें" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                {loading ? (
                  <SelectItem value="loading" disabled>लोड हो रहा है...</SelectItem>
                ) : existingSubjects.length === 0 ? (
                  <SelectItem value="no-data" disabled>कोई विषय उपलब्ध नहीं</SelectItem>
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
            <Label htmlFor="topic">टॉपिक चुनें</Label>
            <Select 
              value={formData.topicName} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, topicName: value }))}
              disabled={!formData.subject}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="पहले विषय चुनें" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                {!formData.subject ? (
                  <SelectItem value="no-subject" disabled>पहले विषय चुनें</SelectItem>
                ) : existingTopics[formData.subject]?.length === 0 ? (
                  <SelectItem value="no-topics" disabled>इस विषय में कोई टॉपिक नहीं</SelectItem>
                ) : (
                  existingTopics[formData.subject]?.map(topic => (
                    <SelectItem key={topic} value={topic} className="hover:bg-accent">
                      {topic}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">PDF फ़ाइल चुनें</Label>
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
                  अपलोड हो रहा है...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  अपलोड करें
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              बंद करें
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};