-- Skills data
INSERT INTO skills (skill_id, name, description, category, level) VALUES
('11111111-1111-1111-1111-111111111111', 'React', 'Frontend UI development with components and hooks.', 'Frontend', 95),
('22222222-2222-2222-2222-222222222222', 'TypeScript', 'Strong typing and safer frontend development.', 'Frontend', 90),
('33333333-3333-3333-3333-333333333333', 'Next.js', 'React framework for production applications.', 'Frontend', 88),
('44444444-4444-4444-4444-444444444444', 'Tailwind CSS', 'Utility-first CSS framework for rapid UI development.', 'Frontend', 92),
('55555555-5555-5555-5555-555555555555', 'Spring Boot', 'Build REST APIs with clean layered architecture.', 'Backend', 85),
('66666666-6666-6666-6666-666666666666', 'Node.js', 'JavaScript runtime for backend services.', 'Backend', 85),
('77777777-7777-7777-7777-777777777777', 'PostgreSQL', 'Relational database design and SQL queries.', 'Backend', 85),
('88888888-8888-8888-8888-888888888888', 'MongoDB', 'NoSQL document database for flexible schemas.', 'Backend', 78),
('99999999-9999-9999-9999-999999999999', 'Docker', 'Containerization and docker-compose workflows.', 'DevOps', 82),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'AWS', 'Amazon Web Services cloud platform.', 'DevOps', 75),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Git', 'Distributed version control system.', 'DevOps', 90),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'CI/CD', 'GitHub Actions and continuous deployment.', 'DevOps', 78)
ON CONFLICT (skill_id) DO NOTHING;

-- Contact Info data
INSERT INTO contact_info (email, phone, address, linkedin, github, website) VALUES
('mattys.leduc@gmail.com', '+1 (514) 506-1001', 'Montreal, Quebec, Canada', 'https://linkedin.com/in/mattys-leduc-405435307', 'https://github.com/mattysleduc', 'https://mattysleduc.com')
ON CONFLICT (id) DO NOTHING;

-- Projects data
INSERT INTO projects (project_id, name_en, name_fr, description_en, description_fr, image_url, technologies, repo_url, demo_url, featured) VALUES
('a1111111-1111-1111-1111-111111111111', 'Neural Network Visualizer', 'Visualiseur de Réseau Neuronal', 'An interactive web application that visualizes neural network architectures and training processes in real-time. Built with React and D3.js for stunning data visualization.', 'Application web interactive qui visualise les architectures de réseaux neuronaux en temps réel.', 'https://via.placeholder.com/300x200?text=NeuralViz', 'React,D3.js,Python,TensorFlow', 'https://github.com/mattysleduc/neural-viz', 'https://neural-viz.example.com', TRUE),
('a2222222-2222-2222-2222-222222222222', 'Crypto Dashboard', 'Tableau de Bord Crypto', 'A real-time cryptocurrency tracking dashboard with portfolio management, price alerts, and market analysis powered by multiple exchange APIs.', 'Tableau de bord de suivi de cryptomonnaies en temps réel avec gestion de portefeuille.', 'https://via.placeholder.com/300x200?text=CryptoDash', 'Next.js,TypeScript,WebSocket,PostgreSQL', 'https://github.com/mattysleduc/crypto-dash', 'https://crypto.example.com', TRUE),
('a3333333-3333-3333-3333-333333333333', 'AI Code Assistant', 'Assistant de Code IA', 'A VS Code extension that leverages GPT models to provide intelligent code suggestions, documentation generation, and bug detection.', 'Extension VS Code exploitant les modèles GPT pour des suggestions de code intelligentes.', 'https://via.placeholder.com/300x200?text=AIAssistant', 'TypeScript,OpenAI API,VS Code API', 'https://github.com/mattysleduc/ai-assistant', 'https://marketplace.visualstudio.com/ai-assistant', TRUE),
('a4444444-4444-4444-4444-444444444444', 'E-commerce Platform', 'Plateforme E-commerce', 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard for store management.', 'Plateforme e-commerce complète avec inventaire en temps réel et traitement des paiements.', 'https://via.placeholder.com/300x200?text=Ecommerce', 'React,Node.js,Stripe,MongoDB', 'https://github.com/mattysleduc/ecommerce', 'https://shop.example.com', FALSE),
('a5555555-5555-5555-5555-555555555555', 'Task Management System', 'Système de Gestion de Tâches', 'A collaborative project management tool with kanban boards, time tracking, and team analytics built for remote teams.', 'Outil de gestion de projet collaboratif avec tableaux kanban et suivi du temps.', 'https://via.placeholder.com/300x200?text=TaskMgmt', 'Vue.js,GraphQL,PostgreSQL,Redis', 'https://github.com/mattysleduc/task-mgmt', 'https://tasks.example.com', FALSE),
('a6666666-6666-6666-6666-666666666666', 'Weather Analytics App', 'Application Météo Analytique', 'A weather forecasting app with historical data analysis, interactive maps, and personalized weather alerts.', 'Application de prévisions météo avec analyse de données historiques et cartes interactives.', 'https://via.placeholder.com/300x200?text=Weather', 'React Native,Python,FastAPI,Redis', 'https://github.com/mattysleduc/weather-app', 'https://weather.example.com', FALSE)
ON CONFLICT (project_id) DO NOTHING;

-- Education data
INSERT INTO education (education_id, degree_en, degree_fr, institution_en, institution_fr, location_en, location_fr, description_en, description_fr, start_date, end_date, gpa, type) VALUES
('b1111111-1111-1111-1111-111111111111', 'Master of Science in Computer Science', 'Maîtrise en Informatique', 'MIT - Massachusetts Institute of Technology', 'MIT - Massachusetts Institute of Technology', 'Cambridge, MA', 'Cambridge, MA', 'Specialized in Machine Learning and Distributed Systems. Thesis on neural network optimization techniques.', 'Spécialisé en apprentissage automatique et systèmes distribués.', '2014-09-01', '2016-05-31', '3.9/4.0', 'degree'),
('b2222222-2222-2222-2222-222222222222', 'Bachelor of Science in Computer Science', 'Baccalauréat en Informatique', 'Stanford University', 'Université de Stanford', 'Stanford, CA', 'Stanford, CA', 'Core curriculum in software engineering, algorithms, and data structures. Minor in Mathematics.', 'Programme de base en génie logiciel, algorithmes et structures de données.', '2010-09-01', '2014-05-31', '3.8/4.0', 'degree'),
('b3333333-3333-3333-3333-333333333333', 'AWS Solutions Architect Professional', 'AWS Solutions Architect Professional', 'Amazon Web Services', 'Amazon Web Services', 'Online', 'En ligne', 'Advanced AWS certification for designing distributed systems', 'Certification AWS avancée pour la conception de systèmes distribués', NULL, '2023-06-15', NULL, 'certification'),
('b4444444-4444-4444-4444-444444444444', 'Google Cloud Professional Developer', 'Développeur Professionnel Google Cloud', 'Google Cloud', 'Google Cloud', 'Online', 'En ligne', 'Professional certification for Google Cloud Platform development', 'Certification professionnelle pour le développement sur Google Cloud Platform', NULL, '2022-08-20', NULL, 'certification'),
('b5555555-5555-5555-5555-555555555555', 'Kubernetes Administrator (CKA)', 'Administrateur Kubernetes (CKA)', 'CNCF', 'CNCF', 'Online', 'En ligne', 'Cloud Native Computing Foundation Kubernetes certification', 'Certification Kubernetes de la Cloud Native Computing Foundation', NULL, '2022-11-10', NULL, 'certification'),
('b6666666-6666-6666-6666-666666666666', 'React Advanced Patterns', 'Patterns Avancés React', 'Frontend Masters', 'Frontend Masters', 'Online', 'En ligne', 'Advanced React patterns and performance optimization', 'Patterns React avancés et optimisation des performances', NULL, '2021-03-25', NULL, 'certification'),
('b7777777-7777-7777-7777-777777777777', 'Deep Learning Specialization', 'Spécialisation en Deep Learning', 'Coursera', 'Coursera', 'Online', 'En ligne', 'Comprehensive deep learning course series', 'Série de cours complète sur l''apprentissage profond', NULL, '2023-01-15', NULL, 'course'),
('b8888888-8888-8888-8888-888888888888', 'System Design Masterclass', 'Masterclass en Conception de Systèmes', 'Educative', 'Educative', 'Online', 'En ligne', 'Advanced system design patterns and architectures', 'Patterns et architectures de conception de systèmes avancés', NULL, '2022-06-30', NULL, 'course'),
('b9999999-9999-9999-9999-999999999999', 'Advanced TypeScript Patterns', 'Patterns TypeScript Avancés', 'Udemy', 'Udemy', 'Online', 'En ligne', 'Deep dive into TypeScript advanced features', 'Plongée approfondie dans les fonctionnalités avancées de TypeScript', NULL, '2022-09-12', NULL, 'course'),
('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'GraphQL & Apollo', 'GraphQL & Apollo', 'Apollo GraphQL', 'Apollo GraphQL', 'Online', 'En ligne', 'Modern GraphQL development with Apollo', 'Développement GraphQL moderne avec Apollo', NULL, '2021-11-20', NULL, 'course')
ON CONFLICT (education_id) DO NOTHING;

-- Contact Messages data
INSERT INTO contact_messages (contact_message_id, name, email, subject, message, read) VALUES
('c1111111-1111-1111-1111-111111111111', 'John Doe', 'john@example.com', 'Project Inquiry', 'I am interested in discussing potential collaboration opportunities.', FALSE),
('c2222222-2222-2222-2222-222222222222', 'Jane Smith', 'jane@example.com', 'Technical Question', 'Can you provide more details about your backend architecture?', FALSE)
ON CONFLICT (contact_message_id) DO NOTHING;

-- Testimonials data
INSERT INTO testimonials (testimonial_id, author_name, author_title, company, author_image, content, rating, status) VALUES
('d1111111-1111-1111-1111-111111111111', 'Sarah Chen', 'CTO', 'TechStartup', 'https://via.placeholder.com/100?text=SC', 'John is an exceptional developer who consistently delivers high-quality work. His ability to understand complex requirements and translate them into elegant solutions is remarkable. He''s also a great team player and mentor.', 5, 'APPROVED'),
('d2222222-2222-2222-2222-222222222222', 'Michael Roberts', 'Product Manager', 'BigCorp', 'https://via.placeholder.com/100?text=MR', 'Working with John was a fantastic experience. He brought innovative ideas to the table and always went above and beyond to ensure the project''s success. His technical expertise and communication skills are top-notch.', 5, 'APPROVED'),
('d3333333-3333-3333-3333-333333333333', 'Emily Watson', 'Design Lead', 'CreativeAgency', 'https://via.placeholder.com/100?text=EW', 'John has an incredible eye for detail and really understands the importance of user experience. He transformed our designs into pixel-perfect, performant interfaces. A pleasure to collaborate with!', 5, 'APPROVED'),
('d4444444-4444-4444-4444-444444444444', 'David Park', 'Engineering Manager', 'ScaleUp', 'https://via.placeholder.com/100?text=DP', 'John quickly became an invaluable member of our team. His problem-solving skills and ability to learn new technologies rapidly made him stand out. He''s the kind of developer every team needs.', 5, 'APPROVED'),
('d5555555-5555-5555-5555-555555555555', 'Lisa Thompson', 'CEO', 'StartupXYZ', 'https://via.placeholder.com/100?text=LT', 'John built our entire MVP from scratch in record time. His technical decisions were sound, and he set us up for scalable growth. I highly recommend him for any challenging project.', 5, 'APPROVED'),
('d6666666-6666-6666-6666-666666666666', 'James Wilson', 'Senior Developer', 'TechGiant', 'https://via.placeholder.com/100?text=JW', 'As a colleague, John was always willing to help and share knowledge. His code reviews were thorough and constructive. He elevated the entire team''s performance.', 5, 'APPROVED')
ON CONFLICT (testimonial_id) DO NOTHING;

-- Hobbies data
INSERT INTO hobbies (hobby_id, name_en, name_fr, description_en, description_fr, icon, icon_url) VALUES
('e1111111-1111-1111-1111-111111111111', 'Rock Climbing', 'Escalade', 'I love the mental and physical challenge of bouldering. There''s something deeply satisfying about solving movement puzzles on the wall.', 'J''adore le défi mental et physique de l''escalade de bloc.', 'Mountain', 'https://via.placeholder.com/50?text=⛰️'),
('e2222222-2222-2222-2222-222222222222', 'Photography', 'Photographie', 'Capturing moments and exploring different perspectives through street and landscape photography. Always learning new techniques.', 'Capturer des moments et explorer différentes perspectives.', 'Camera', 'https://via.placeholder.com/50?text=📷'),
('e3333333-3333-3333-3333-333333333333', 'Gaming', 'Jeux Vidéo', 'From strategy games to immersive RPGs, gaming helps me unwind and appreciate great storytelling and game design.', 'Des jeux de stratégie aux RPG immersifs, le jeu m''aide à me détendre.', 'Gamepad2', 'https://via.placeholder.com/50?text=🎮'),
('e4444444-4444-4444-4444-444444444444', 'Reading', 'Lecture', 'Sci-fi novels and tech books are my favorites. Currently exploring the intersection of AI and human creativity.', 'Les romans de science-fiction et les livres techniques sont mes préférés.', 'BookOpen', 'https://via.placeholder.com/50?text=📚'),
('e5555555-5555-5555-5555-555555555555', 'Music Production', 'Production Musicale', 'Creating electronic music in my spare time. It''s a creative outlet that combines technical skills with artistic expression.', 'Créer de la musique électronique pendant mon temps libre.', 'Music', 'https://via.placeholder.com/50?text=🎵'),
('e6666666-6666-6666-6666-666666666666', 'Coffee Exploration', 'Exploration du Café', 'Always on the hunt for the perfect brew. I enjoy visiting local roasters and experimenting with different brewing methods.', 'Toujours à la recherche du café parfait.', 'Coffee', 'https://via.placeholder.com/50?text=☕')
ON CONFLICT (hobby_id) DO NOTHING;

-- Experiences data
INSERT INTO experiences (experience_id, title, company, location, start_date, end_date, current, description, responsibilities) VALUES
('f1111111-1111-1111-1111-111111111111', 'Senior Full-Stack Developer', 'TechCorp Inc.', 'San Francisco, CA', '2022-01-01', NULL, TRUE, 'Leading development of enterprise-scale applications, mentoring junior developers, and architecting cloud-native solutions.', E'Reduced application load time by 60% through optimization\nLed team of 5 developers on major product redesign\nImplemented CI/CD pipelines reducing deployment time by 80%'),
('f2222222-2222-2222-2222-222222222222', 'Full-Stack Developer', 'StartupXYZ', 'Remote', '2020-03-01', '2021-12-31', FALSE, 'Built and maintained multiple web applications from concept to deployment, working closely with product and design teams.', E'Developed core product features serving 100K+ users\nIntegrated third-party APIs and payment systems\nBuilt real-time collaboration features using WebSockets'),
('f3333333-3333-3333-3333-333333333333', 'Frontend Developer', 'Digital Agency', 'New York, NY', '2018-06-01', '2020-02-28', FALSE, 'Created responsive web interfaces and interactive experiences for various clients across different industries.', E'Delivered 20+ client projects on time and budget\nImproved website performance scores by 40%\nImplemented accessibility standards across all projects'),
('f4444444-4444-4444-4444-444444444444', 'Junior Developer', 'Web Solutions Ltd', 'Boston, MA', '2016-08-01', '2018-05-31', FALSE, 'Started my professional journey building websites and learning best practices in software development.', E'Developed custom WordPress themes and plugins\nLearned React and modern JavaScript frameworks\nCollaborated with senior developers on client projects')
ON CONFLICT (experience_id) DO NOTHING;
