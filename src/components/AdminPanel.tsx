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
    chapter: '',
    topicName: '',
    file: null as File | null
  });
  const { toast } = useToast();

  const subjects = [
    'indian-history', 'national-movement', 'geography', 
    'indian-economy', 'constitution', 'general-science',
    'hindi', 'english', 'mathematics', 'general-awareness', 'reasoning'
  ];

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

  const handleUpload = async () => {
    if (!formData.file || !formData.subject || !formData.chapter || !formData.topicName) {
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
      const fileExt = formData.file.name.split('.').pop();
      const fileName = `${Date.now()}-${formData.file.name}`;
      const filePath = `${formData.subject}/${formData.chapter}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, formData.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

      // Save metadata to Supabase database
      const { error: dbError } = await supabase
        .from('notes')
        .insert({
          subject_id: formData.subject,
          chapter_id: formData.chapter,
          topic_id: formData.topicName.toLowerCase().replace(/\s+/g, '-'),
          title: formData.topicName,
          content: `PDF Document: ${formData.topicName}`,
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder for admin uploads
        });

      if (dbError) throw dbError;

      toast({
        title: "सफलतापूर्वक अपलोड",
        description: "PDF नोट्स सफलतापूर्वक अपलोड हो गए"
      });

      // Reset form
      setFormData({ subject: '', chapter: '', topicName: '', file: null });
      
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
            <Label htmlFor="chapter">अध्याय का नाम</Label>
            <Input
              value={formData.chapter}
              onChange={(e) => setFormData(prev => ({ ...prev, chapter: e.target.value }))}
              placeholder="जैसे: प्राचीन भारत"
            />
          </div>

          <div>
            <Label htmlFor="topic">टॉपिक का नाम</Label>
            <Input
              value={formData.topicName}
              onChange={(e) => setFormData(prev => ({ ...prev, topicName: e.target.value }))}
              placeholder="जैसे: सिंधु घाटी सभ्यता"
            />
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