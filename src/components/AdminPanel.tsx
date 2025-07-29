import { useState } from 'react';
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
  const { toast } = useToast();

  const subjects = [
    'indian-history', 'national-movement', 'geography', 
    'indian-economy', 'constitution', 'general-science',
    'hindi', 'english', 'mathematics', 'general-awareness', 'reasoning'
  ];

  const topicsBySubject = {
    'indian-history': [
      'ancient-civilization', 'mauryan-empire', 'gupta-period', 'medieval-period', 
      'mughal-empire', 'maratha-empire', 'regional-kingdoms'
    ],
    'national-movement': [
      'early-nationalism', 'partition-bengal', 'swadeshi-movement', 'revolutionary-movement',
      'gandhi-era', 'civil-disobedience', 'quit-india', 'independence-partition'
    ],
    'geography': [
      'physical-geography', 'climate-weather', 'rivers-lakes', 'mountains-plateaus',
      'soils-agriculture', 'minerals-resources', 'population-settlements'
    ],
    'indian-economy': [
      'economic-planning', 'agriculture-sector', 'industrial-sector', 'service-sector',
      'banking-finance', 'trade-commerce', 'budget-taxation'
    ],
    'constitution': [
      'making-constitution', 'fundamental-rights', 'directive-principles', 'federal-structure',
      'parliament-functions', 'executive-powers', 'judiciary-system'
    ],
    'general-science': [
      'physics-basics', 'chemistry-basics', 'biology-basics', 'environmental-science',
      'space-technology', 'computer-science', 'medical-science'
    ],
    'hindi': [
      'grammar-basics', 'literature-poetry', 'essay-writing', 'comprehension',
      'letter-writing', 'vocabulary', 'pronunciation'
    ],
    'english': [
      'grammar-rules', 'vocabulary-building', 'reading-comprehension', 'essay-writing',
      'letter-formats', 'spoken-english', 'literature'
    ],
    'mathematics': [
      'arithmetic', 'algebra', 'geometry', 'trigonometry',
      'statistics', 'probability', 'calculus-basics'
    ],
    'general-awareness': [
      'current-affairs', 'sports-games', 'awards-honors', 'books-authors',
      'international-events', 'national-events', 'science-discoveries'
    ],
    'reasoning': [
      'logical-reasoning', 'analytical-reasoning', 'verbal-reasoning', 'non-verbal-reasoning',
      'data-interpretation', 'puzzles-games', 'series-patterns'
    ]
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

  const getTopicDisplayName = (topicId: string) => {
    const topicNames = {
      'ancient-civilization': 'प्राचीन सभ्यता',
      'mauryan-empire': 'मौर्य साम्राज्य',
      'gupta-period': 'गुप्त काल',
      'medieval-period': 'मध्यकालीन भारत',
      'mughal-empire': 'मुगल साम्राज्य',
      'maratha-empire': 'मराठा साम्राज्य',
      'regional-kingdoms': 'क्षेत्रीय राज्य',
      'early-nationalism': 'प्रारंभिक राष्ट्रवाद',
      'partition-bengal': 'बंगाल विभाजन',
      'swadeshi-movement': 'स्वदेशी आंदोलन',
      'revolutionary-movement': 'क्रांतिकारी आंदोलन',
      'gandhi-era': 'गांधी युग',
      'civil-disobedience': 'सविनय अवज्ञा',
      'quit-india': 'भारत छोड़ो',
      'independence-partition': 'स्वतंत्रता और विभाजन',
      'physical-geography': 'भौतिक भूगोल',
      'climate-weather': 'जलवायु और मौसम',
      'rivers-lakes': 'नदियां और झीलें',
      'mountains-plateaus': 'पर्वत और पठार',
      'soils-agriculture': 'मिट्टी और कृषि',
      'minerals-resources': 'खनिज और संसाधन',
      'population-settlements': 'जनसंख्या और बस्तियां'
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

      // Save metadata to Supabase database
      const { error: dbError } = await supabase
        .from('notes')
        .insert({
          subject_id: formData.subject,
          chapter_id: formData.topicName,
          topic_id: formData.topicName,
          title: getTopicDisplayName(formData.topicName),
          content: `PDF Document: ${getTopicDisplayName(formData.topicName)}`,
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
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
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
                {formData.subject && topicsBySubject[formData.subject]?.map(topic => (
                  <SelectItem key={topic} value={topic} className="hover:bg-accent">
                    {getTopicDisplayName(topic)}
                  </SelectItem>
                ))}
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