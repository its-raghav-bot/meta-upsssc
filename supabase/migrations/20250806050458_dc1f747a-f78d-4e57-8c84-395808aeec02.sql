-- Create storage policies for the pdfs bucket to allow admin uploads

-- Allow anyone to read from pdfs bucket (since it's public)
CREATE POLICY "Allow public read access to pdfs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdfs');

-- Allow admin to upload files
CREATE POLICY "Allow admin to upload pdfs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdfs');

-- Allow admin to delete files  
CREATE POLICY "Allow admin to delete pdfs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdfs');