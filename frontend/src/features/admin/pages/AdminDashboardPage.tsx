import './AdminDashboardPage.css';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Projects</h3>
          <p className="stat">Manage your projects</p>
        </div>
        <div className="dashboard-card">
          <h3>Skills</h3>
          <p className="stat">Manage your skills</p>
        </div>
        <div className="dashboard-card">
          <h3>Experience</h3>
          <p className="stat">Manage your experience</p>
        </div>
        <div className="dashboard-card">
          <h3>Contact Messages</h3>
          <p className="stat">View incoming messages</p>
        </div>
      </div>
    </div>
  );
};
