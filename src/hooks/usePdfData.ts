import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PdfNote {
  id: string;
  title: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  content: string;
  file_path?: string; // Add the file_path field
  created_at: string;
  updated_at: string;
}

export const usePdfData = () => {
  const [pdfNotes, setPdfNotes] = useState<PdfNote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPdfNotes(data || []);
    } catch (error) {
      console.error('Error fetching PDF notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfNotes();
  }, []);

  const getPdfUrl = (filePath: string) => {
    // Use the stored file path directly
    const { data } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  const downloadPdf = async (pdfUrl: string, fileName: string, topicId?: string) => {
    let link: HTMLAnchorElement | null = null;
    let objectUrl: string | null = null;
    
    try {
      // Check if URL is accessible first
      if (!pdfUrl || !fileName) {
        throw new Error('Invalid URL or filename');
      }

      // Use a more direct approach for modern browsers
      if ('showSaveFilePicker' in window) {
        // Modern File System Access API (Chrome 86+)
        try {
          const response = await fetch(pdfUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          
          const fileHandle = await (window as any).showSaveFilePicker({
            suggestedName: fileName,
            types: [{
              description: 'PDF files',
              accept: { 'application/pdf': ['.pdf'] }
            }]
          });
          
          const writableStream = await fileHandle.createWritable();
          await writableStream.write(blob);
          await writableStream.close();
          
          // Mark as downloaded if topicId provided
          if (topicId) {
            localStorage.setItem(`pdf_downloaded_${topicId}`, JSON.stringify({
              fileName,
              downloadedAt: new Date().toISOString()
            }));
          }
          
          return; // Success, exit early
        } catch (fsApiError) {
          console.log('File System API failed, falling back to traditional method');
          // Fall through to traditional method
        }
      }

      // Traditional download method
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      
      // Create and configure download link
      link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      link.style.cssText = 'display: none; position: absolute; left: -9999px;';
      
      // Add to DOM temporarily
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Mark as downloaded if topicId provided
      if (topicId) {
        localStorage.setItem(`pdf_downloaded_${topicId}`, JSON.stringify({
          fileName,
          downloadedAt: new Date().toISOString()
        }));
      }
      
      // Immediate cleanup to prevent memory issues
      requestAnimationFrame(() => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      });
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      
      // Cleanup on error
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      
      // Show user-friendly error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to download PDF: ${errorMessage}. Please try again.`);
    }
  };

  const isPdfDownloaded = (topicId: string): boolean => {
    const downloaded = localStorage.getItem(`pdf_downloaded_${topicId}`);
    return !!downloaded;
  };

  return {
    pdfNotes,
    loading,
    fetchPdfNotes,
    getPdfUrl,
    downloadPdf,
    isPdfDownloaded
  };
};