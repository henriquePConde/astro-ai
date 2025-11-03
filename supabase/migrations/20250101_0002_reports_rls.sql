-- Enable RLS on reports table
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can SELECT their own reports
CREATE POLICY "reports: select own"
  ON reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can INSERT their own reports
CREATE POLICY "reports: insert own"
  ON reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Public can SELECT reports by ID (for public sharing)
CREATE POLICY "reports: select public by id"
  ON reports
  FOR SELECT
  USING (true); -- Allow public read access for sharing

-- Add index on user_id if not already exists (should be in Prisma schema)
CREATE INDEX IF NOT EXISTS reports_user_id_idx ON reports(user_id);

