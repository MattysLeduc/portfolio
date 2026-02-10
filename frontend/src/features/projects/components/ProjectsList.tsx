import { useEffect, useState } from "react";
import { getAllProjects } from "../api/getAllProjects";
import type { ProjectResponseModel } from "../models/ProjectResponseModel";

export const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project.projectId} className="project-card">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.nameEn}
              className="project-image"
            />
          )}
          <h3>{project.nameEn}</h3>
          <p>{project.descriptionEn}</p>
          <div className="project-links">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
