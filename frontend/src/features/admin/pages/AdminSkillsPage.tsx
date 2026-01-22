import { useEffect, useState } from 'react';
import { getAllSkills } from '../../skills/api/getAllSkills';
import { createSkill } from '../../skills/api/createSkill';
import { deleteSkill } from '../../skills/api/deleteSkill';
import { updateSkill } from '../../skills/api/updateSkill';
import type { SkillResponseModel } from '../../skills/models/SkillResponseModel';
import type { SkillRequestModel } from '../../skills/models/SkillRequestModel';
import './AdminSkillsPage.css';

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillRequestModel>({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSkill(editingId, formData);
      } else {
        await createSkill(formData);
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: SkillResponseModel) => {
    setEditingId(skill.skillId);
    setFormData({
      name: skill.name,
      description: skill.description,
    });
    setShowForm(true);
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
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSkill(skillId);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Manage Skills</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add Skill'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Create'}</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.skillId}>
              <td>{skill.name}</td>
              <td>{skill.description}</td>
              <td>
                <button onClick={() => handleEdit(skill)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(skill.skillId)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
