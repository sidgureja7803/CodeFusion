-- Enable Row Level Security on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Problem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Submission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TestCaseResult" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProblemSolved" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Playlist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProblemPlaylist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Revision" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "discussions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "discussion_likes" ENABLE ROW LEVEL SECURITY;

-- Create a function to get current user ID from session
CREATE OR REPLACE FUNCTION current_user_id() RETURNS text AS $$
BEGIN
  RETURN current_setting('app.current_user_id', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies for User table
-- Users can only see and modify their own data
CREATE POLICY "Users can view own data" ON "User"
  FOR SELECT
  USING (current_user_id() = id OR current_user = 'service_role');

CREATE POLICY "Users can update own data" ON "User"
  FOR UPDATE
  USING (current_user_id() = id OR current_user = 'service_role');

CREATE POLICY "Users can insert own data" ON "User"
  FOR INSERT
  WITH CHECK (current_user_id() = id OR current_user = 'service_role');

-- Create policies for Problem table
-- All users can view problems, only problem creators and admins can modify
CREATE POLICY "Anyone can view problems" ON "Problem"
  FOR SELECT
  USING (true);

CREATE POLICY "Problem creators can modify problems" ON "Problem"
  FOR ALL
  USING (current_user_id() = "userId" OR current_user = 'service_role');

-- Create policies for Submission table
-- Users can only see their own submissions
CREATE POLICY "Users can view own submissions" ON "Submission"
  FOR SELECT
  USING (current_user_id() = "userId" OR current_user = 'service_role');

CREATE POLICY "Users can insert own submissions" ON "Submission"
  FOR INSERT
  WITH CHECK (current_user_id() = "userId" OR current_user = 'service_role');

CREATE POLICY "Users can update own submissions" ON "Submission"
  FOR UPDATE
  USING (current_user_id() = "userId" OR current_user = 'service_role');

-- Create policies for TestCaseResult table
-- Users can only see test results for their own submissions
CREATE POLICY "Users can view own test results" ON "TestCaseResult"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Submission" 
      WHERE "Submission".id = "TestCaseResult"."submissionId" 
      AND "Submission"."userId" = current_user_id()
    ) OR current_user = 'service_role'
  );

CREATE POLICY "System can insert test results" ON "TestCaseResult"
  FOR INSERT
  WITH CHECK (current_user = 'service_role');

-- Create policies for ProblemSolved table
-- Users can only see their own solved problems
CREATE POLICY "Users can view own solved problems" ON "ProblemSolved"
  FOR SELECT
  USING (current_user_id() = "userId" OR current_user = 'service_role');

CREATE POLICY "Users can insert own solved problems" ON "ProblemSolved"
  FOR INSERT
  WITH CHECK (current_user_id() = "userId" OR current_user = 'service_role');

-- Create policies for Playlist table
-- Users can only manage their own playlists
CREATE POLICY "Users can view own playlists" ON "Playlist"
  FOR SELECT
  USING (current_user_id() = "userId" OR current_user = 'service_role');

CREATE POLICY "Users can manage own playlists" ON "Playlist"
  FOR ALL
  USING (current_user_id() = "userId" OR current_user = 'service_role');

-- Create policies for ProblemPlaylist table
-- Users can only manage problems in their own playlists
CREATE POLICY "Users can view own playlist problems" ON "ProblemPlaylist"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Playlist" 
      WHERE "Playlist".id = "ProblemPlaylist"."playlistId" 
      AND "Playlist"."userId" = current_user_id()
    ) OR current_user = 'service_role'
  );

CREATE POLICY "Users can manage own playlist problems" ON "ProblemPlaylist"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "Playlist" 
      WHERE "Playlist".id = "ProblemPlaylist"."playlistId" 
      AND "Playlist"."userId" = current_user_id()
    ) OR current_user = 'service_role'
  );

-- Create policies for Revision table
-- Users can only manage their own revisions
CREATE POLICY "Users can view own revisions" ON "Revision"
  FOR SELECT
  USING (current_user_id() = "userId" OR current_user = 'service_role');

CREATE POLICY "Users can manage own revisions" ON "Revision"
  FOR ALL
  USING (current_user_id() = "userId" OR current_user = 'service_role');

-- Create policies for discussions table
-- All users can view discussions, only authors can modify their own
CREATE POLICY "Anyone can view discussions" ON "discussions"
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert discussions" ON "discussions"
  FOR INSERT
  WITH CHECK (current_user_id() = "authorId" OR current_user = 'service_role');

CREATE POLICY "Authors can update own discussions" ON "discussions"
  FOR UPDATE
  USING (current_user_id() = "authorId" OR current_user = 'service_role');

CREATE POLICY "Authors can delete own discussions" ON "discussions"
  FOR DELETE
  USING (current_user_id() = "authorId" OR current_user = 'service_role');

-- Create policies for discussion_likes table
-- Users can only manage their own likes
CREATE POLICY "Anyone can view discussion likes" ON "discussion_likes"
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own likes" ON "discussion_likes"
  FOR ALL
  USING (current_user_id() = "userId" OR current_user = 'service_role'); 