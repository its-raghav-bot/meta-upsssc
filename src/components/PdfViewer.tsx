import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, ExternalLink, Share2, Download } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PdfViewerProps {
  pdfUrl: string;
  fileName: string;
  onDownload: () => void;
  isDownloaded: boolean;
}

export const PdfViewer = ({ pdfUrl, fileName, onDownload, isDownloaded }: PdfViewerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleOpenPdf = () => {
    try {
      window.open(pdfUrl, '_blank');
    } catch (error) {
      setError('PDF खोलने में समस्या हुई');
    }
  };

  const handleSharePdf = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: fileName,
          text: `PDF नोट्स: ${fileName}`,
          url: pdfUrl,
        });
      } else {
        // Web fallback
        if (navigator.share) {
          await navigator.share({
            title: fileName,
            text: `PDF नोट्स: ${fileName}`,
            url: pdfUrl,
          });
        } else {
          // Copy to clipboard as fallback
          await navigator.clipboard.writeText(pdfUrl);
          alert('PDF लिंक कॉपी हो गया!');
        }
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
      setError('शेयर करने में समस्या हुई');
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await onDownload();
    } catch (error) {
      setError('डाउनलोड करने में समस्या हुई');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">📄 PDF नोट्स उपलब्ध हैं</h3>
          <p className="text-muted-foreground">
            {isDownloaded 
              ? 'PDF फाइल पहले से डाउनलोड है। नीचे के विकल्प चुनें:'
              : 'PDF फाइल देखने या डाउनलोड करने के लिए नीचे के विकल्प चुनें:'
            }
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Open PDF Button */}
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleOpenPdf}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {isDownloaded ? 'PDF खोलें' : 'PDF देखें'}
          </Button>

          {/* Download Button */}
          {!isDownloaded && (
            <Button 
              variant="outline"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? 'डाउनलोड...' : 'डाउनलोड करें'}
            </Button>
          )}

          {/* Share Button */}
          <Button 
            variant="outline"
            onClick={handleSharePdf}
          >
            <Share2 className="w-4 h-4 mr-2" />
            शेयर करें
          </Button>
        </div>

        {/* PDF Preview/Access Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm space-y-2">
            {Capacitor.isNativePlatform() ? (
              <>
                <p className="flex items-center gap-2">
                  📱 <span>मोबाइल ऐप में PDF सीधे खुलेगा</span>
                </p>
                <p className="flex items-center gap-2">
                  💾 <span>डाउनलोड की गई फाइलें डिवाइस में सेव होंगी</span>
                </p>
              </>
            ) : (
              <>
                <p className="flex items-center gap-2">
                  🌐 <span>PDF नई टैब में खुलेगा</span>
                </p>
                <p className="flex items-center gap-2">
                  📥 <span>डाउनलोड फ़ोल्डर में सेव होगा</span>
                </p>
              </>
            )}
          </div>
        </div>

        {isDownloaded && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success-foreground">
              ✅ PDF पहले से डाउनलोड है और उपलब्ध है
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};