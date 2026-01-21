import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>Explore my work, skills, and experience</p>
        <div className="hero-actions">
          <Link to="/projects">
            <button className="btn-primary">View Projects</button>
          </Link>
          <Link to="/contact">
            <button className="btn-secondary">Contact Me</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
