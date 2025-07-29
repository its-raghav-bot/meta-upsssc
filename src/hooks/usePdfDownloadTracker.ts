import { useState, useEffect } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

interface DownloadedPdf {
  topicId: string;
  fileName: string;
  filePath: string;
  downloadedAt: string;
}

export const usePdfDownloadTracker = () => {
  const [downloadedPdfs, setDownloadedPdfs] = useState<DownloadedPdf[]>([]);

  // Load downloaded PDFs from storage
  useEffect(() => {
    loadDownloadedPdfs();
  }, []);

  const loadDownloadedPdfs = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        const { data } = await Filesystem.readFile({
          path: 'downloaded_pdfs.json',
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        const parsed = JSON.parse(data as string);
        setDownloadedPdfs(parsed);
      } else {
        // Web fallback - use localStorage
        const stored = localStorage.getItem('downloaded_pdfs');
        if (stored) {
          setDownloadedPdfs(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.log('No downloaded PDFs found or error loading:', error);
      setDownloadedPdfs([]);
    }
  };

  const saveDownloadedPdfs = async (pdfs: DownloadedPdf[]) => {
    try {
      const data = JSON.stringify(pdfs);
      
      if (Capacitor.isNativePlatform()) {
        await Filesystem.writeFile({
          path: 'downloaded_pdfs.json',
          data,
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
      } else {
        // Web fallback - use localStorage
        localStorage.setItem('downloaded_pdfs', data);
      }
      setDownloadedPdfs(pdfs);
    } catch (error) {
      console.error('Error saving downloaded PDFs:', error);
    }
  };

  const markPdfAsDownloaded = async (topicId: string, fileName: string, filePath: string) => {
    const newDownload: DownloadedPdf = {
      topicId,
      fileName,
      filePath,
      downloadedAt: new Date().toISOString(),
    };

    const updated = [...downloadedPdfs.filter(pdf => pdf.topicId !== topicId), newDownload];
    await saveDownloadedPdfs(updated);
  };

  const isPdfDownloaded = (topicId: string): boolean => {
    return downloadedPdfs.some(pdf => pdf.topicId === topicId);
  };

  const getDownloadedPdf = (topicId: string): DownloadedPdf | undefined => {
    return downloadedPdfs.find(pdf => pdf.topicId === topicId);
  };

  const removePdfRecord = async (topicId: string) => {
    const updated = downloadedPdfs.filter(pdf => pdf.topicId !== topicId);
    await saveDownloadedPdfs(updated);
  };

  return {
    downloadedPdfs,
    markPdfAsDownloaded,
    isPdfDownloaded,
    getDownloadedPdf,
    removePdfRecord,
    loadDownloadedPdfs,
  };
};