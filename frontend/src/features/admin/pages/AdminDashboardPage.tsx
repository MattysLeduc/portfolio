import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSkills } from "../../skills/api/getAllSkills";
import { getAllProjects } from "../../projects/api/getAllProjects";
import { getAllExperiences } from "../../experience/api/getAllExperiences";
import { getAllEducation } from "../../education/api/getAllEducation";
import { getAllHobbies } from "../../hobbies/api/getAllHobbies";
import { getAllTestimonials } from "../../testimonials/api/getAllTestimonials";
import { getPendingTestimonials } from "../../testimonials/api/admin/getPendingTestimonials";
import { getAllMessages } from "../../contact/api/admin/getAllMessages";
import "./AdminDashboardPage.css";

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    experiences: 0,
    education: 0,
    hobbies: 0,
    testimonials: 0,
    pendingTestimonials: 0,
    messages: 0,
    unreadMessages: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        skills,
        projects,
        experiences,
        education,
        hobbies,
        testimonials,
        pendingTestimonials,
        messages,
      ] = await Promise.all([
        getAllSkills(),
        getAllProjects(),
        getAllExperiences(),
        getAllEducation(),
        getAllHobbies(),
        getAllTestimonials(),
        getPendingTestimonials(),
        getAllMessages(),
      ]);

      const unreadMessages = messages.filter((msg: any) => !msg.read).length;

      setStats({
        skills: skills.length,
        projects: projects.length,
        experiences: experiences.length,
        education: education.length,
        hobbies: hobbies.length,
        testimonials: testimonials.length,
        pendingTestimonials: pendingTestimonials.length,
        messages: messages.length,
        unreadMessages: unreadMessages,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const cards = [
    {
      title: "Skills",
      count: stats.skills,
      link: "/admin/skills",
      icon: "⚡",
      color: "#5AB1FF",
    },
    {
      title: "Projects",
      count: stats.projects,
      link: "/admin/projects",
      icon: "🚀",
      color: "#00D9FF",
    },
    {
      title: "Experience",
      count: stats.experiences,
      link: "/admin/experience",
      icon: "💼",
      color: "#FFB84C",
    },
    {
      title: "Education",
      count: stats.education,
      link: "/admin/education",
      icon: "🎓",
      color: "#A459D1",
    },
    {
      title: "Hobbies",
      count: stats.hobbies,
      link: "/admin/hobbies",
      icon: "🎮",
      color: "#F266AB",
    },
    {
      title: "Testimonials",
      count: stats.testimonials,
      link: "/admin/testimonials",
      icon: "💬",
      color: "#4CAF50",
      badge:
        stats.pendingTestimonials > 0
          ? `${stats.pendingTestimonials} pending`
          : undefined,
    },
    {
      title: "Messages",
      count: stats.messages,
      link: "/admin/messages",
      icon: "📧",
      color: "#FF9800",
      badge:
        stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined,
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your portfolio content</p>
        </div>
        <Link
          to="/admin/panel"
          className="btn-primary"
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            background: "var(--primary)",
            color: "white",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          📝 Unified Editor
        </Link>
      </div>

      {stats.loading ? (
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {cards.map((card: any) => (
            <Link to={card.link} key={card.title} className="dashboard-card">
              <div className="card-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p className="card-count">
                  {card.count} {card.count === 1 ? "item" : "items"}
                </p>
                {card.badge && <p className="card-badge">{card.badge}</p>}
              </div>
              <div className="card-arrow" style={{ color: card.color }}>
                →
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/skills" className="action-btn">
            <span>➕</span> Add Skill
          </Link>
          <Link to="/admin/projects" className="action-btn">
            <span>➕</span> Add Project
          </Link>
          <Link to="/admin/experience" className="action-btn">
            <span>➕</span> Add Experience
          </Link>
          <Link to="/admin/education" className="action-btn">
            <span>➕</span> Add Education
          </Link>
        </div>
      </div>
    </div>
  );
};
