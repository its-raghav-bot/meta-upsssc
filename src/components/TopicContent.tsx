import { useState, useEffect } from "react";
import { Topic } from "@/types/notes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle, RotateCcw, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePdfData } from "@/hooks/usePdfData";
import { supabase } from "@/integrations/supabase/client";

interface TopicContentProps {
  topic: Topic;
  onBack: () => void;
  onToggleComplete: (topicId: string) => void;
}

export const TopicContent = ({ topic, onBack, onToggleComplete }: TopicContentProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const { pdfNotes, getPdfUrl, downloadPdf } = usePdfData();

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  // Check if this topic has an associated PDF in Supabase
  useEffect(() => {
    const matchingPdfNote = pdfNotes.find(note => 
      note.topic_id === topic.id || 
      note.title.toLowerCase() === topic.name.toLowerCase()
    );
    
    if (matchingPdfNote && matchingPdfNote.file_path) {
      // Use the stored file path directly
      const url = getPdfUrl(matchingPdfNote.file_path);
      setPdfUrl(url);
      console.log('Found PDF with file path:', matchingPdfNote.file_path, 'URL:', url);
    }
  }, [pdfNotes, topic.id, topic.name, getPdfUrl]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="flex-1 font-semibold text-hindi-lg text-foreground truncate">
            {topic.name}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={topic.isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleComplete(topic.id)}
              className={topic.isCompleted ? "bg-success text-success-foreground" : ""}
            >
              {topic.isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  पूर्ण
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 mr-1" />
                  पूर्ण करें
                </>
              )}
            </Button>
          </div>

          {/* Font size controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={decreaseFontSize} className="px-2">
              <span className="text-xs">A</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setFontSize(16)} className="px-2">
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={increaseFontSize} className="px-2">
              <span className="text-lg">A</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Card className="p-6">
          {(topic.type === 'pdf' && topic.pdfUrl) || pdfUrl ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">PDF नोट्स उपलब्ध हैं</h3>
                <p className="text-muted-foreground mb-4">
                  PDF फाइल देखने या डाउनलोड करने के लिए नीचे के विकल्प चुनें:
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Download Button */}
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    const url = pdfUrl || topic.pdfUrl || '';
                    const fileName = `${topic.name}.pdf`;
                    downloadPdf(url, fileName);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  डाउनलोड करें
                </Button>

                {/* Open in New Tab Button */}
                <Button 
                  variant="outline"
                  onClick={() => {
                    const url = pdfUrl || topic.pdfUrl || '';
                    window.open(url, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  नई टैब में खोलें
                </Button>
              </div>
              
              {/* PDF Preview Info */}
              <div className="mt-4 text-sm text-muted-foreground">
                <p>📱 मोबाइल में PDF देखने के लिए "नई टैब में खोलें" का उपयोग करें</p>
              </div>
            </div>
          ) : (
            <div 
              className="prose prose-lg max-w-none font-hindi leading-relaxed text-foreground"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            >
              <div className="whitespace-pre-line">
                {topic.content}
              </div>
            </div>
          )}
        </Card>

        {/* Topic metadata */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          {topic.lastRead && (
            <p>पिछली बार पढ़ा: {new Date(topic.lastRead).toLocaleDateString('hi-IN')}</p>
          )}
        </div>
      </div>
    </div>
  );
};