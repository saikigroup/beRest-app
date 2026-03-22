-- Add email and linked_auth_methods to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linked_auth_methods text[] DEFAULT '{}';

-- Index for email lookup
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
