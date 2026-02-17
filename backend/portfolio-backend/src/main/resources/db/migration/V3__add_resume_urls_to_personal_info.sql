-- Add resume URL columns to personal_info table
ALTER TABLE personal_info
ADD COLUMN resume_en_url VARCHAR(500),
ADD COLUMN resume_fr_url VARCHAR(500);
