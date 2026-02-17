-- Clean up personal_info table - keep only one record with proper data
DELETE FROM personal_info WHERE id > 1;

-- Insert or update the main personal info record
INSERT INTO personal_info (
    id,
    name_en,
    name_fr,
    tagline_en,
    tagline_fr,
    hero_welcome_en,
    hero_welcome_fr,
    github_url,
    linkedin_url,
    twitter_url,
    email,
    contact_message_en,
    contact_message_fr,
    resume_en_url,
    resume_fr_url
) VALUES (
    1,
    'Mattys Leduc',
    'Mattys Leduc',
    'Full Stack Developer',
    'Développeur Full Stack',
    'Welcome to my portfolio! I''m a passionate developer who loves creating elegant solutions to complex problems.',
    'Bienvenue sur mon portfolio! Je suis un développeur passionné qui aime créer des solutions élégantes à des problèmes complexes.',
    'https://github.com/mattysleduc',
    'https://linkedin.com/in/mattys-leduc-405435307',
    'https://twitter.com/mattysleduc',
    'mattys.leduc@gmail.com',
    'I''m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open. I''ll try my best to get back to you!',
    'Je recherche actuellement de nouvelles opportunités. Que vous ayez une question ou que vous vouliez simplement dire bonjour, ma boîte de réception est toujours ouverte. Je ferai de mon mieux pour vous répondre!',
    'https://soflzzegrlquwswapxwk.supabase.co/storage/v1/object/public/project-images/resumes/en/1771298209725-jd9a88.pdf',
    'https://soflzzegrlquwswapxwk.supabase.co/storage/v1/object/public/project-images/resumes/fr/1771298215573-1qaov.pdf'
)
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_fr = EXCLUDED.name_fr,
    tagline_en = EXCLUDED.tagline_en,
    tagline_fr = EXCLUDED.tagline_fr,
    hero_welcome_en = EXCLUDED.hero_welcome_en,
    hero_welcome_fr = EXCLUDED.hero_welcome_fr,
    github_url = EXCLUDED.github_url,
    linkedin_url = EXCLUDED.linkedin_url,
    twitter_url = EXCLUDED.twitter_url,
    email = EXCLUDED.email,
    contact_message_en = EXCLUDED.contact_message_en,
    contact_message_fr = EXCLUDED.contact_message_fr,
    resume_en_url = EXCLUDED.resume_en_url,
    resume_fr_url = EXCLUDED.resume_fr_url;
