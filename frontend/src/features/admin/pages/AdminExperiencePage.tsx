import { useEffect, useState } from 'react';
import { getExperiences } from '../../experience/api/getExperiences';
import { createExperience } from '../../experience/api/createExperience';
import { updateExperience } from '../../experience/api/updateExperience';
import type { Experience } from '../../experience/models/Experience';
import './AdminExperiencePage.css';
import axiosInstance from '../../../shared/api/apiClient';

export const AdminExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, formData);
      } else {
        await createExperience(formData);
      }
      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.experienceId);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current,
      description: exp.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axiosInstance.delete(`/admin/experiences/${id}`);
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  return (
    <div className="admin-page">
      <h1>Manage Experience</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add Experience'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
            />
            Currently working here
          </label>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="btn-primary">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.experienceId}>
              <td>{exp.title}</td>
              <td>{exp.company}</td>
              <td>{exp.location}</td>
              <td>{new Date(exp.startDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(exp)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(exp.experienceId)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
