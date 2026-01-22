
-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    skill_id VARCHAR(36) NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id VARCHAR(36) NOT NULL UNIQUE,
    name_en VARCHAR(200) NOT NULL,
    name_fr VARCHAR(200) NOT NULL,
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    image_url VARCHAR(500),
    repo_url VARCHAR(500),
    demo_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    education_id VARCHAR(36) NOT NULL UNIQUE,
    degree_en VARCHAR(200) NOT NULL,
    degree_fr VARCHAR(200) NOT NULL,
    institution_en VARCHAR(200) NOT NULL,
    institution_fr VARCHAR(200) NOT NULL,
    location_en VARCHAR(200),
    location_fr VARCHAR(200),
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200),
    phone VARCHAR(20),
    address VARCHAR(300),
    linkedin VARCHAR(300),
    github VARCHAR(300),
    website VARCHAR(300)
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contact_message_id VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    read_flag BOOLEAN DEFAULT FALSE
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    testimonial_id VARCHAR(36) NOT NULL UNIQUE,
    author_name VARCHAR(200) NOT NULL,
    author_title VARCHAR(200),
    author_image VARCHAR(500),
    content VARCHAR(2000) NOT NULL,
    rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'PENDING',
    rejection_reason VARCHAR(500)
);

-- Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hobby_id VARCHAR(36) NOT NULL UNIQUE,
    name_en VARCHAR(200) NOT NULL,
    name_fr VARCHAR(200) NOT NULL,
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    icon_url VARCHAR(500)
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    experience_id VARCHAR(36) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description VARCHAR(2000)
);

