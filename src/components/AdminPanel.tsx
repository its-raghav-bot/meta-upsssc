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
      'indus-valley-civilization': 'सिंधु घाटी सभ्यता',
      'vedic-civilization': 'वैदिक सभ्यता',
      'buddhism': 'बौद्ध धर्म',
      'jainism': 'जैन धर्म',
      'mauryan-empire': 'मौर्य साम्राज्य',
      'gupta-empire': 'गुप्त साम्राज्य',
      'harshavardhan': 'हर्षवर्धन',
      'rajput-era': 'राजपूत काल',
      'sultanate-era': 'सल्तनत काल',
      'mughal-empire': 'मुगल साम्राज्य',
      'maratha-empire': 'मराठा साम्राज्य',
      'british-rule-first-war': 'ब्रिटिश शासन और प्रथम स्वतंत्रता संग्राम',
      'social-economic-impact-british': 'ब्रिटिश शासन का सामाजिक और आर्थिक प्रभाव',
      
      // National Movement
      'early-resistance': 'प्रारंभिक प्रतिरोध',
      'sepoy-mutiny': 'सिपाही विद्रोह',
      'congress-formation': 'कांग्रेस की स्थापना',
      'partition-bengal': 'बंगाल विभाजन',
      'swadeshi-movement': 'स्वदेशी आंदोलन',
      'revolutionary-movement': 'क्रांतिकारी आंदोलन',
      'gandhian-era': 'गांधी युग',
      'non-cooperation': 'असहयोग आंदोलन',
      'civil-disobedience': 'सविनय अवज्ञा',
      'quit-india': 'भारत छोड़ो आंदोलन',
      'freedom-fighters': 'स्वतंत्रता सेनानी',
      'independence-partition': 'स्वतंत्रता और विभाजन',
      
      // Geography
      'earth-structure': 'पृथ्वी की संरचना',
      'landforms': 'भू-आकृतियां',
      'climate-weather': 'जलवायु और मौसम',
      'rivers-lakes': 'नदियां और झीलें',
      'population-settlement': 'जनसंख्या और बसाव',
      'agriculture': 'कृषि',
      'industries': 'उद्योग',
      'transport': 'परिवहन',
      'indian-physical': 'भारत का भौतिक स्वरूप',
      'indian-climate': 'भारत की जलवायु',
      'indian-rivers': 'भारत की नदियां',
      'world-continents': 'विश्व के महाद्वीप',
      
      // Economy
      'economic-development': 'आर्थिक विकास',
      'planning-commission': 'योजना आयोग',
      'five-year-plans': 'पंचवर्षीय योजनाएं',
      'agriculture-sector': 'कृषि क्षेत्र',
      'industrial-sector': 'औद्योगिक क्षेत्र',
      'service-sector': 'सेवा क्षेत्र',
      'banking-finance': 'बैंकिंग और वित्त',
      'monetary-policy': 'मौद्रिक नीति',
      'fiscal-policy': 'राजकोषीय नीति',
      'trade-commerce': 'व्यापार और वाणिज्य',
      'economic-reforms': 'आर्थिक सुधार',
      'current-challenges': 'वर्तमान चुनौतियां',
      
      // Constitution
      'making-constitution': 'संविधान निर्माण',
      'preamble': 'प्रस्तावना',
      'fundamental-rights': 'मौलिक अधिकार',
      'fundamental-duties': 'मौलिक कर्तव्य',
      'directive-principles': 'नीति निदेशक तत्व',
      'union-government': 'केंद्र सरकार',
      'parliament': 'संसद',
      'president': 'राष्ट्रपति',
      'prime-minister': 'प्रधानमंत्री',
      'judiciary': 'न्यायपालिका',
      'supreme-court': 'सर्वोच्च न्यायालय',
      'state-government': 'राज्य सरकार',
      'local-government': 'स्थानीय सरकार',
      'emergency-provisions': 'आपातकालीन प्रावधान',
      'amendments': 'संशोधन',
      
      // Science
      'mechanics': 'यांत्रिकी',
      'heat-thermodynamics': 'उष्मा और ऊष्मागतिकी',
      'light-optics': 'प्रकाश और प्रकाशिकी',
      'electricity': 'विद्युत',
      'atomic-structure': 'परमाणु संरचना',
      'periodic-table': 'आवर्त सारणी',
      'acids-bases': 'अम्ल और क्षार',
      'metals-nonmetals': 'धातु और अधातु',
      'cell-biology': 'कोशिका जीव विज्ञान',
      'human-body': 'मानव शरीर',
      'plant-biology': 'वनस्पति विज्ञान',
      'genetics': 'आनुवंशिकता',
      'ecology-environment': 'पारिस्थितिकी और पर्यावरण',
      'natural-resources': 'प्राकृतिक संसाधन',
      'pollution-control': 'प्रदूषण नियंत्रण',
      
      // Hindi
      'vyakaran-basics': 'व्याकरण मूल बातें',
      'sandhi': 'संधि',
      'samas': 'समास',
      'chhand-alankar': 'छंद और अलंकार',
      'kavya-sahitya': 'काव्य साहित्य',
      'katha-sahitya': 'कथा साहित्य',
      'natak-sahitya': 'नाटक साहित्य',
      'nibandh-sahitya': 'निबंध साहित्य',
      'gadyansh': 'गद्यांश',
      'kavyansh': 'काव्यांश',
      'patra-lekhan': 'पत्र लेखन',
      'nibandh-lekhan': 'निबंध लेखन',
      
      // English
      'parts-of-speech': 'शब्द भेद',
      'tenses': 'काल',
      'voice-narration': 'वाच्य और कथन',
      'sentence-structure': 'वाक्य संरचना',
      'vocabulary-building': 'शब्द भंडार',
      'synonyms-antonyms': 'समानार्थी और विपरीतार्थी',
      'idioms-phrases': 'मुहावरे और वाक्यांश',
      'one-word-substitution': 'एक शब्द प्रतिस्थापन',
      'reading-comprehension': 'गद्यांश समझ',
      'cloze-test': 'रिक्त स्थान पूर्ति',
      'error-correction': 'त्रुटि सुधार',
      'essay-writing': 'निबंध लेखन',
      
      // Math
      'number-system': 'संख्या प्रणाली',
      'percentage': 'प्रतिशत',
      'profit-loss': 'लाभ-हानि',
      'simple-compound-interest': 'साधारण और चक्रवृद्धि ब्याज',
      'time-work': 'समय और कार्य',
      'time-distance': 'समय और दूरी',
      'averages': 'औसत',
      'ratio-proportion': 'अनुपात और समानुपात',
      'algebra-basics': 'बीजगणित मूल बातें',
      'linear-equations': 'रैखिक समीकरण',
      'geometry-basics': 'ज्यामिति मूल बातें',
      'mensuration': 'क्षेत्रमिति',
      'trigonometry': 'त्रिकोणमिति',
      'statistics-basics': 'सांख्यिकी मूल बातें',
      'probability': 'प्रायिकता',
      'data-interpretation': 'डेटा व्याख्या',
      
      // GK
      'current-affairs-national': 'राष्ट्रीय समसामयिकी',
      'current-affairs-international': 'अंतर्राष्ट्रीय समसामयिकी',
      'government-schemes': 'सरकारी योजनाएं',
      'awards-honours': 'पुरस्कार और सम्मान',
      'sports-events': 'खेल घटनाएं',
      'books-authors': 'पुस्तकें और लेखक',
      'important-days': 'महत्वपूर्ण दिवस',
      'organizations': 'संगठन',
      'capitals-currencies': 'राजधानी और मुद्रा',
      'indian-states': 'भारतीय राज्य',
      'world-geography-facts': 'विश्व भूगोल तथ्य',
      'science-technology': 'विज्ञान और तकनीक',
      'defence-security': 'रक्षा और सुरक्षा',
      'economy-finance': 'अर्थव्यवस्था और वित्त',
      
      // Reasoning
      'verbal-analogy': 'शाब्दिक सादृश्य',
      'classification': 'वर्गीकरण',
      'series-completion': 'श्रृंखला पूर्ति',
      'coding-decoding': 'कोडिंग-डिकोडिंग',
      'blood-relations': 'रक्त संबंध',
      'direction-distance': 'दिशा और दूरी',
      'ranking-arrangement': 'क्रम और व्यवस्था',
      'syllogism': 'न्याय वाक्य',
      'statement-conclusion': 'कथन और निष्कर्ष',
      'statement-assumption': 'कथन और पूर्वधारणा',
      'critical-reasoning': 'आलोचनात्मक तर्क',
      'puzzles-seating': 'पहेली और बैठक व्यवस्था',
      'calendar-clock': 'कैलेंडर और घड़ी',
      'number-series': 'संख्या श्रृंखला',
      'figure-series': 'आकृति श्रृंखला',
      'pattern-completion': 'पैटर्न पूर्ति',
      'mirror-water-images': 'दर्पण और जल प्रतिबिंब',
      'paper-cutting-folding': 'कागज काटना और मोड़ना'
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