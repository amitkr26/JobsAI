CREATE TABLE IF NOT EXISTS user_resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  linkedin text,
  github text,
  education jsonb DEFAULT '[]'::jsonb,
  skills text[],
  experience jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  publications jsonb DEFAULT '[]'::jsonb,
  ats_score integer DEFAULT 0,
  ats_feedback jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_resumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own resume" ON user_resumes
  FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION sync_ats_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles SET resume_ats_score = NEW.ats_score, updated_at = now()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER sync_resume_ats
  AFTER INSERT OR UPDATE ON user_resumes
  FOR EACH ROW EXECUTE FUNCTION sync_ats_score();
