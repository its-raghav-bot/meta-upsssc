-- Create storage policies for the pdfs bucket to allow admin uploads

-- Policy to allow anyone to upload PDFs (since this is admin functionality)
CREATE POLICY "Allow PDF uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdfs');

-- Policy to allow reading PDFs (for viewing uploaded files)
CREATE POLICY "Allow PDF reads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdfs');

-- Policy to allow updating PDF metadata
CREATE POLICY "Allow PDF updates" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pdfs');

-- Policy to allow deleting PDFs (for admin management)
CREATE POLICY "Allow PDF deletes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdfs');