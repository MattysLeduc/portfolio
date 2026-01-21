import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioService } from '../../../shared/api/portfolioService';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolioSummary();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) return <div className="page"><p>Loading portfolio...</p></div>;

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Welcome to My Portfolio</h1>
          <p>A fullstack developer passionate about creating amazing digital experiences</p>
          <button onClick={() => navigate('/contact')} className="cta-button">Get in Touch</button>
        </div>
      </section>

      <section className="featured-projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-preview">
            {portfolioData?.projects?.slice(0, 3).map((project: any) => (
              <div key={project.id} className="project-preview">
                <img src={project.imageUrl} alt={project.title} />
                <h3>{project.title}</h3>
                <p>{project.description?.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/projects')} className="view-all">View All Projects</button>
        </div>
      </section>

      <section className="featured-skills">
        <div className="container">
          <h2>Key Skills</h2>
          <div className="skills-preview">
            {portfolioData?.skills?.slice(0, 6).map((skill: any) => (
              <div key={skill.id} className="skill-preview">
                <h4>{skill.name}</h4>
                <div className="skill-bar">
                  <div className="skill-level" style={{ width: `${skill.proficiency}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-preview">
        <div className="container">
          <h2>What People Say</h2>
          <div className="testimonials-preview-grid">
            {portfolioData?.testimonials?.slice(0, 3).map((testimonial: any) => (
              <div key={testimonial.id} className="testimonial-preview">
                <p>"{testimonial.content.substring(0, 80)}..."</p>
                <p className="author">{testimonial.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
