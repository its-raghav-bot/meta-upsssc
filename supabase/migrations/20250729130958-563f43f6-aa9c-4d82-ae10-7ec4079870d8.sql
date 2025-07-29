-- Create storage bucket for PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for PDF uploads
CREATE POLICY "Anyone can view PDFs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdfs');

CREATE POLICY "Authenticated users can upload PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update PDFs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete PDFs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');