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
    'indian-history': ['ancient-india', 'medieval-india', 'modern-india', 'art-culture'],
    'national-movement': ['freedom-struggle', 'leaders', 'movements', 'independence'],
    'geography': ['physical-geography', 'human-geography', 'indian-geography', 'world-geography'],
    'indian-economy': ['economic-planning', 'sectors', 'policies', 'current-issues'],
    'constitution': ['fundamental-rights', 'directive-principles', 'parliament', 'judiciary'],
    'general-science': ['physics', 'chemistry', 'biology', 'environmental-science'],
    'hindi': ['grammar', 'literature', 'comprehension', 'writing'],
    'english': ['grammar', 'vocabulary', 'comprehension', 'writing'],
    'mathematics': ['arithmetic', 'algebra', 'geometry', 'statistics'],
    'general-awareness': ['current-affairs', 'static-gk', 'important-dates', 'awards'],
    'reasoning': ['logical-reasoning', 'analytical-reasoning', 'verbal-reasoning', 'non-verbal-reasoning']
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

  const getTopicDisplayName = (topicId: string) => {
    const topicNames: {[key: string]: string} = {
      // Indian History
      'ancient-india': 'प्राचीन भारत',
      'medieval-india': 'मध्यकालीन भारत', 
      'modern-india': 'आधुनिक भारत',
      'art-culture': 'कला और संस्कृति',
      
      // National Movement
      'freedom-struggle': 'स्वतंत्रता संग्राम',
      'leaders': 'नेता',
      'movements': 'आंदोलन',
      'independence': 'स्वतंत्रता',
      
      // Geography
      'physical-geography': 'भौतिक भूगोल',
      'human-geography': 'मानव भूगोल',
      'indian-geography': 'भारतीय भूगोल',
      'world-geography': 'विश्व भूगोल',
      
      // Economy
      'economic-planning': 'आर्थिक योजना',
      'sectors': 'क्षेत्र',
      'policies': 'नीतियां',
      'current-issues': 'वर्तमान मुद्दे',
      
      // Constitution
      'fundamental-rights': 'मौलिक अधिकार',
      'directive-principles': 'नीति निदेशक तत्व',
      'parliament': 'संसद',
      'judiciary': 'न्यायपालिका',
      
      // Science
      'physics': 'भौतिकी',
      'chemistry': 'रसायन विज्ञान',
      'biology': 'जीव विज्ञान',
      'environmental-science': 'पर्यावरण विज्ञान',
      
      // Languages
      'grammar': 'व्याकरण',
      'literature': 'साहित्य',
      'comprehension': 'गद्यांश',
      'writing': 'लेखन',
      'vocabulary': 'शब्दावली',
      
      // Math
      'arithmetic': 'अंकगणित',
      'algebra': 'बीजगणित', 
      'geometry': 'ज्यामिति',
      'statistics': 'सांख्यिकी',
      
      // GK
      'current-affairs': 'समसामयिकी',
      'static-gk': 'स्थिर सामान्य ज्ञान',
      'important-dates': 'महत्वपूर्ण तिथियां',
      'awards': 'पुरस्कार',
      
      // Reasoning
      'logical-reasoning': 'तार्किक तर्कशक्ति',
      'analytical-reasoning': 'विश्लेषणात्मक तर्कशक्ति',
      'verbal-reasoning': 'मौखिक तर्कशक्ति',
      'non-verbal-reasoning': 'अमौखिक तर्कशक्ति'
    };
    return topicNames[topicId] || topicId;
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
                      {getTopicDisplayName(topic)}
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