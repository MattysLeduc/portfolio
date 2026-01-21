import { Outlet, Link } from 'react-router-dom';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav className="admin-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/skills">Skills</Link>
          <Link to="/admin/projects">Projects</Link>
          <Link to="/admin/experiences">Experiences</Link>
          <Link to="/admin/education">Education</Link>
          <Link to="/admin/hobbies">Hobbies</Link>
          <Link to="/admin/testimonials">Testimonials</Link>
          <Link to="/admin/contact">Contact</Link>
          <Link to="/admin/resume">Resume</Link>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};
