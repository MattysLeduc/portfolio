-- Skills data
INSERT INTO skills (skill_id, name, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Spring Boot', 'Build REST APIs with clean layered architecture.'),
('22222222-2222-2222-2222-222222222222', 'React', 'Frontend UI development with components and hooks.'),
('33333333-3333-3333-3333-333333333333', 'TypeScript', 'Strong typing and safer frontend development.'),
('44444444-4444-4444-4444-444444444444', 'PostgreSQL', 'Relational database design and SQL queries.'),
('55555555-5555-5555-5555-555555555555', 'Docker', 'Containerization and docker-compose workflows.'),
('66666666-6666-6666-6666-666666666666', 'GitHub Actions', 'CI/CD pipelines for testing and deployment.'),
('77777777-7777-7777-7777-777777777777', 'Spring Security', 'Authentication and authorization for admin access.'),
('88888888-8888-8888-8888-888888888888', 'JUnit & Mockito', 'Unit testing and mocking dependencies.');

-- Contact Info data
INSERT INTO contact_info (email, phone, address, linkedin, github, website) VALUES
('mattys.leduc@gmail.com', '+1 (514) 506-1001', 'Montreal, Quebec, Canada', 'https://linkedin.com/in/mattys-leduc-405435307', 'https://github.com/mattysleduc', 'https://mattysleduc.com');

-- Projects data
INSERT INTO projects (project_id, name_en, name_fr, description_en, description_fr, image_url, repo_url, demo_url, featured) VALUES
('a1111111-1111-1111-1111-111111111111', 'Portfolio Website', 'Site de Portefeuille', 'Full-stack portfolio application with Spring Boot backend and React frontend', 'Application de portefeuille full-stack avec backend Spring Boot et frontend React', 'https://via.placeholder.com/300x200?text=Portfolio', 'https://github.com/mattysleduc/portfolio', 'https://portfolio.example.com', TRUE),
('a2222222-2222-2222-2222-222222222222', 'Task Manager App', 'Application de Gestionnaire de Tâches', 'Collaborative task management tool with real-time updates', 'Outil de gestion des tâches collaboratif avec mises à jour en temps réel', 'https://via.placeholder.com/300x200?text=TaskManager', 'https://github.com/mattysleduc/taskmanager', 'https://taskmanager.example.com', TRUE),
('a3333333-3333-3333-3333-333333333333', 'E-commerce Platform', 'Plateforme de Commerce Électronique', 'Scalable e-commerce solution with payment integration', 'Solution de commerce électronique évolutive avec intégration de paiement', 'https://via.placeholder.com/300x200?text=Ecommerce', 'https://github.com/mattysleduc/ecommerce', 'https://ecommerce.example.com', FALSE);

-- Education data
INSERT INTO education (education_id, degree_en, degree_fr, institution_en, institution_fr, location_en, location_fr, description_en, description_fr, start_date, end_date) VALUES
('b1111111-1111-1111-1111-111111111111', 'Bachelor of Science in Computer Science', 'Baccalauréat en Informatique', 'University of Technology', 'Université de Technologie', 'Montreal, QC', 'Montréal, QC', 'Focused on software development and system design', 'Axé sur le développement logiciel et la conception de systèmes', '2018-09-01', '2022-05-31'),
('b2222222-2222-2222-2222-222222222222', 'Full Stack Web Development Bootcamp', 'Bootcamp de Développement Web Full Stack', 'Code Academy', 'Académie de Code', 'Montreal, QC', 'Montréal, QC', 'Intensive 12-week program covering frontend and backend technologies', 'Programme intensif de 12 semaines couvrant les technologies frontend et backend', '2022-06-01', '2022-08-31');

-- Contact Messages data
INSERT INTO contact_messages (contact_message_id, name, email, subject, message, read_flag) VALUES
('c1111111-1111-1111-1111-111111111111', 'John Doe', 'john@example.com', 'Project Inquiry', 'I am interested in discussing potential collaboration opportunities.', FALSE),
('c2222222-2222-2222-2222-222222222222', 'Jane Smith', 'jane@example.com', 'Technical Question', 'Can you provide more details about your backend architecture?', FALSE);

-- Testimonials data
INSERT INTO testimonials (testimonial_id, author_name, author_title, author_image, content, rating, status) VALUES
('d1111111-1111-1111-1111-111111111111', 'Alice Johnson', 'Senior Developer at TechCorp', 'https://via.placeholder.com/100?text=Alice', 'Excellent work on the project. Highly professional and delivers quality code.', 5, 'APPROVED'),
('d2222222-2222-2222-2222-222222222222', 'Bob Wilson', 'Project Manager at StartupXYZ', 'https://via.placeholder.com/100?text=Bob', 'Great communication and problem-solving skills. Highly recommended.', 5, 'APPROVED');

-- Hobbies data
INSERT INTO hobbies (hobby_id, name_en, name_fr, description_en, description_fr, icon_url) VALUES
('e1111111-1111-1111-1111-111111111111', 'Photography', 'Photographie', 'Capturing moments and exploring the world through the lens', 'Capturer des moments et explorer le monde à travers l''objectif', 'https://via.placeholder.com/50?text=📷'),
('e2222222-2222-2222-2222-222222222222', 'Gaming', 'Jeux Vidéo', 'Enjoying strategic and collaborative gaming experiences', 'Apprécier les expériences de jeu stratégiques et collaboratives', 'https://via.placeholder.com/50?text=🎮'),
('e3333333-3333-3333-3333-333333333333', 'Reading', 'Lecture', 'Exploring different genres and expanding knowledge', 'Explorer différents genres et élargir ses connaissances', 'https://via.placeholder.com/50?text=📚'),
('e4444444-4444-4444-4444-444444444444', 'Hiking', 'Randonnée', 'Enjoying nature and outdoor adventures', 'Profiter de la nature et des aventures en plein air', 'https://via.placeholder.com/50?text=⛰️');

-- Experiences data
INSERT INTO experiences (experience_id, title, company, location, start_date, end_date, current, description) VALUES
('f1111111-1111-1111-1111-111111111111', 'Senior Software Engineer', 'TechCorp', 'Montreal, QC', '2023-01-01', NULL, TRUE, 'Leading a team building cloud-native services and frontend integrations.'),
('f2222222-2222-2222-2222-222222222222', 'Full Stack Developer', 'StartupXYZ', 'Toronto, ON', '2021-05-01', '2022-12-31', FALSE, 'Delivered end-to-end features across React and Spring Boot, improving performance and reliability.');
