-- ElectroBridge News Cleanup
-- Run this in Supabase SQL Editor to remove duplicates and prevent future ones

-- Step 1: Delete duplicate news by source_url (keep the oldest entry)
DELETE FROM news_articles a USING (
  SELECT MIN(id) as id, source_url
  FROM news_articles
  WHERE source_url IS NOT NULL
  GROUP BY source_url
  HAVING COUNT(*) > 1
) b
WHERE a.source_url = b.source_url
  AND a.id <> b.id;

-- Step 2: Delete duplicate news by title (where source_url is null, keep oldest)
DELETE FROM news_articles a USING (
  SELECT MIN(id) as id, title
  FROM news_articles
  WHERE source_url IS NULL
  GROUP BY title
  HAVING COUNT(*) > 1
) b
WHERE a.source_url IS NULL
  AND a.title = b.title
  AND a.id <> b.id;

-- Step 3: Generate slugs for articles without one
UPDATE news_articles
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- Step 4: Handle slug collisions by appending a suffix
UPDATE news_articles a
SET slug = a.slug || '-' || SUBSTRING(a.id::text, 1, 8)
WHERE EXISTS (
  SELECT 1 FROM news_articles b
  WHERE b.slug = a.slug AND b.id <> a.id
);

-- Step 5: Add unique constraint on source_url (prevents future duplicates)
ALTER TABLE news_articles ADD CONSTRAINT news_source_url_unique UNIQUE (source_url);

-- Step 6: Add unique constraint on slug
ALTER TABLE news_articles ADD CONSTRAINT news_slug_unique UNIQUE (slug);

-- Step 7: Remove any remaining rows with null slug (shouldn't happen after step 3)
DELETE FROM news_articles WHERE slug IS NULL OR slug = '';
