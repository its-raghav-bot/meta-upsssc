import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PdfNote {
  id: string;
  title: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  content: string;
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

  const getPdfUrl = (subject: string, chapter: string, fileName: string) => {
    // Files are uploaded to subject/filename format, not subject/chapter/filename
    const filePath = `${subject}/${fileName}`;
    const { data } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  const downloadPdf = async (pdfUrl: string, fileName: string) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return {
    pdfNotes,
    loading,
    fetchPdfNotes,
    getPdfUrl,
    downloadPdf
  };
};