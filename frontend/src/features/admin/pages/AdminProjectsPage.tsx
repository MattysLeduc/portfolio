import { useEffect, useState } from 'react';
import { getAllProjects } from '../../projects/api/getAllProjects';
import { createProject } from '../../projects/api/createProject';
import { deleteProject } from '../../projects/api/deleteProject';
import { updateProject } from '../../projects/api/updateProject';
import type { ProjectResponseModel } from '../../projects/models/ProjectResponseModel';
import type { ProjectRequestModel } from '../../projects/models/ProjectRequestModel';
import './AdminProjectsPage.css';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectRequestModel>({
    nameEn: '',
    nameFr: '',
    descriptionEn: '',
    descriptionFr: '',
    imageUrl: '',
    repoUrl: '',
    demoUrl: '',
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: ProjectResponseModel) => {
    setEditingId(project.projectId);
    setFormData({
      nameEn: project.nameEn,
      nameFr: project.nameFr,
      descriptionEn: project.descriptionEn,
      descriptionFr: project.descriptionFr,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      demoUrl: project.demoUrl || '',
      featured: project.featured,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      nameEn: '',
      nameFr: '',
      descriptionEn: '',
      descriptionFr: '',
      imageUrl: '',
      repoUrl: '',
      demoUrl: '',
      featured: false,
    });
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProject(projectId);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Manage Projects</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add Project'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Project Name (English)"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Project Name (French)"
            value={formData.nameFr}
            onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (English)"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          />
          <textarea
            placeholder="Description (French)"
            value={formData.descriptionFr}
            onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <input
            type="text"
            placeholder="Repository URL"
            value={formData.repoUrl}
            onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
          />
          <input
            type="text"
            placeholder="Demo URL"
            value={formData.demoUrl}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            Featured Project
          </label>
          <button type="submit" className="btn-primary">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name (EN)</th>
            <th>Description (EN)</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.projectId}>
              <td>{project.nameEn}</td>
              <td>{project.descriptionEn?.substring(0, 50)}...</td>
              <td>{project.featured ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(project)} className="btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.projectId)} className="btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
