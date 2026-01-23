import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
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
        <div className="admin-topbar">
          <div className="topbar-left">
            <span className="topbar-title">Admin</span>
          </div>
          <div className="topbar-right">
            {user?.username && (
              <span className="topbar-user">{user.username}</span>
            )}
            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
