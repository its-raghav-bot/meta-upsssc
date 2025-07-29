-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_subject_id ON notes(subject_id);
CREATE INDEX IF NOT EXISTS idx_notes_topic_id ON notes(topic_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_file_path ON notes(file_path) WHERE file_path IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_notes_user_subject ON notes(user_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_notes_subject_topic ON notes(subject_id, topic_id);

-- Add indexes for profiles table
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);