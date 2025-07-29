-- Add file_path column to notes table to store the actual file path in storage
ALTER TABLE public.notes 
ADD COLUMN file_path TEXT;