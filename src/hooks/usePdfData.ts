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

  const downloadPdf = async (pdfUrl: string, fileName: string) => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none'; // Hide the link
      
      // Add to DOM, click, and remove immediately
      document.body.appendChild(link);
      link.click();
      
      // Clean up after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
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