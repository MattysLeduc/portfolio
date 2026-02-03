import { useEffect, useState } from 'react';
import { getAllSkills } from '../../skills/api/getAllSkills';
import { createSkill } from '../../skills/api/createSkill';
import { deleteSkill } from '../../skills/api/deleteSkill';
import { updateSkill } from '../../skills/api/updateSkill';
import type { SkillResponseModel } from '../../skills/models/SkillResponseModel';
import type { SkillRequestModel } from '../../skills/models/SkillRequestModel';
import { useLanguage } from '@/context/LanguageContext';
import '../styles/admin-common.css';
import './AdminSkillsPage.css';

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillResponseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<SkillRequestModel>({
    nameEn: '',
    nameFr: '',
    descriptionEn: '',
    descriptionFr: '',
    category: '',
    level: 0,
  });
  const { t } = useLanguage();

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
      nameEn: skill.nameEn || skill.name,
      nameFr: skill.nameFr || skill.name,
      descriptionEn: skill.descriptionEn || skill.description,
      descriptionFr: skill.descriptionFr || skill.description,
      category: skill.category || '',
      level: skill.level || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      nameEn: '',
      nameFr: '',
      descriptionEn: '',
      descriptionFr: '',
      category: '',
      level: 0,
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
        <h1>{t('manageSkills')}</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? `✕ ${t('cancel')}` : `+ ${t('addSkill')}`}
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
            <label htmlFor="nameEn">{t('nameEn')} *</label>
            <input
              id="nameEn"
              type="text"
              placeholder="React, TypeScript, Node.js"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameFr">{t('nameFr')} *</label>
            <input
              id="nameFr"
              type="text"
              placeholder="React, TypeScript, Node.js"
              value={formData.nameFr}
              onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionEn">{t('descriptionEn')} *</label>
            <textarea
              id="descriptionEn"
              placeholder="Brief description of the skill"
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionFr">{t('descriptionFr')} *</label>
            <textarea
              id="descriptionFr"
              placeholder="Brève description de la compétence"
              value={formData.descriptionFr}
              onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">{t('category')}</label>
            <input
              id="category"
              type="text"
              placeholder="Frontend, Backend, DevOps"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">{t('level')}</label>
            <input
              id="level"
              type="number"
              min={0}
              max={100}
              value={formData.level || 0}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? t('updateSkill') : t('createSkill')}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              {t('cancel')}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('loadingSkills')}</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="empty-state">
          <p>{t('noSkills')}</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('description')}</th>
                <th style={{ width: '180px' }}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.skillId}>
                  <td><strong>{skill.nameEn || skill.name}</strong></td>
                  <td>{skill.descriptionEn || skill.description}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => handleEdit(skill)} className="btn btn-secondary">
                        {t('edit')}
                      </button>
                      <button onClick={() => handleDelete(skill.skillId)} className="btn btn-danger">
                        {t('delete')}
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
