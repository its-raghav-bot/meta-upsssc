-- Add public access policies for admin uploaded notes
-- These will allow viewing notes that were uploaded via admin panel

CREATE POLICY "Allow public read access to admin notes" 
ON public.notes 
FOR SELECT 
USING (user_id = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Allow admin to create public notes" 
ON public.notes 
FOR INSERT 
WITH CHECK (user_id = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Allow admin to update public notes" 
ON public.notes 
FOR UPDATE 
USING (user_id = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Allow admin to delete public notes" 
ON public.notes 
FOR DELETE 
USING (user_id = '00000000-0000-0000-0000-000000000000');