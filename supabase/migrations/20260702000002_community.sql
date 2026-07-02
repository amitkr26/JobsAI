CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general'
    CHECK (category IN ('general', 'qna', 'discussion', 'showcase', 'trending')),
  tags text[],
  upvotes integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE(post_id, user_id)
);

CREATE OR REPLACE FUNCTION toggle_upvote(p_post_id uuid, p_user_id uuid)
RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM community_votes WHERE post_id=p_post_id AND user_id=p_user_id) THEN
    DELETE FROM community_votes WHERE post_id=p_post_id AND user_id=p_user_id;
    UPDATE community_posts SET upvotes = upvotes - 1 WHERE id = p_post_id;
  ELSE
    INSERT INTO community_votes (post_id, user_id) VALUES (p_post_id, p_user_id);
    UPDATE community_posts SET upvotes = upvotes + 1 WHERE id = p_post_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Logged in can create posts" ON community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON community_posts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON community_posts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read comments" ON community_comments FOR SELECT USING (true);
CREATE POLICY "Logged in can comment" ON community_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON community_comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can see votes" ON community_votes FOR SELECT USING (true);
CREATE POLICY "Logged in can vote" ON community_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unvote" ON community_votes
  FOR DELETE USING (auth.uid() = user_id);
