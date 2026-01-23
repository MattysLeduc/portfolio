import { useEffect, useState } from 'react';
import { getAllSkills } from '../../skills/api/getAllSkills';
import { createSkill } from '../../skills/api/createSkill';
import { deleteSkill } from '../../skills/api/deleteSkill';
import { updateSkill } from '../../skills/api/updateSkill';
import type { SkillResponseModel } from '../../skills/models/SkillResponseModel';
import type { SkillRequestModel } from '../../skills/models/SkillRequestModel';
import '../styles/admin-common.css';
import './AdminSkillsPage.css';

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<SkillRequestModel>({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      showMessage('error', 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSkill(editingId, formData);
        showMessage('success', 'Skill updated successfully');
      } else {
        await createSkill(formData);
        showMessage('success', 'Skill created successfully');
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      showMessage('error', 'Failed to save skill');
    }
  };

  const handleEdit = (skill: SkillResponseModel) => {
    setEditingId(skill.skillId);
    setFormData({
      name: skill.name,
      description: skill.description,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleDelete = async (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
        showMessage('success', 'Skill deleted successfully');
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        showMessage('error', 'Failed to delete skill');
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Manage Skills</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? '✕ Cancel' : '+ Add Skill'}
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.type === 'success' ? '✓' : '✕'} {message.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Skill Name *</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., React, TypeScript, Node.js"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              placeholder="Brief description of the skill and your proficiency level"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Skill' : 'Create Skill'}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading skills...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="empty-state">
          <p>No skills found. Add your first skill to get started!</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Description</th>
                <th style={{ width: '180px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.skillId}>
                  <td><strong>{skill.name}</strong></td>
                  <td>{skill.description}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => handleEdit(skill)} className="btn btn-secondary">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(skill.skillId)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
