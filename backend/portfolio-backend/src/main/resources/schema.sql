
-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    skill_id VARCHAR(36) NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category    VARCHAR(50),
    level       INT,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL UNIQUE,
    name_en VARCHAR(200) NOT NULL,
    name_fr VARCHAR(200) NOT NULL,
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    image_url VARCHAR(500),
    technologies VARCHAR(1000),
    repo_url VARCHAR(500),
    demo_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    education_id VARCHAR(36) NOT NULL UNIQUE,
    degree_en VARCHAR(200) NOT NULL,
    degree_fr VARCHAR(200) NOT NULL,
    institution_en VARCHAR(200) NOT NULL,
    institution_fr VARCHAR(200) NOT NULL,
    location_en VARCHAR(200),
    location_fr VARCHAR(200),
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    start_date DATE,
    end_date DATE,
    gpa VARCHAR(10),
    type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    phone VARCHAR(20),
    address VARCHAR(300),
    linkedin VARCHAR(300),
    github VARCHAR(300),
    website VARCHAR(300)
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    message_id VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    testimonial_id VARCHAR(36) NOT NULL UNIQUE,
    author_name VARCHAR(200) NOT NULL,
    author_title VARCHAR(200),
    company VARCHAR(255),
    author_image VARCHAR(500),
    content VARCHAR(2000) NOT NULL,
    rating INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'PENDING',
    rejection_reason VARCHAR(500)
);

-- Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
    id SERIAL PRIMARY KEY,
    hobby_id VARCHAR(36) NOT NULL UNIQUE,
    name_en VARCHAR(200) NOT NULL,
    name_fr VARCHAR(200) NOT NULL,
    description_en VARCHAR(1000),
    description_fr VARCHAR(1000),
    icon VARCHAR(50),
    icon_url VARCHAR(500)
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    experience_id VARCHAR(36) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description VARCHAR(2000),
    responsibilities VARCHAR(3000)
);

