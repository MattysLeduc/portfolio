import { useEffect, useState } from 'react';
import { getExperiences } from '../../experience/api/getExperiences';
import { createExperience } from '../../experience/api/createExperience';
import { updateExperience } from '../../experience/api/updateExperience';
import type { Experience } from '../../experience/models/Experience';
import './AdminExperiencePage.css';
import axiosInstance from '../../../shared/api/apiClient';
import { useLanguage } from '@/context/LanguageContext';

export const AdminExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titleEn: '',
    titleFr: '',
    companyEn: '',
    companyFr: '',
    locationEn: '',
    locationFr: '',
    startDate: '',
    endDate: '',
    current: false,
    descriptionEn: '',
    descriptionFr: '',
    responsibilitiesEn: '',
    responsibilitiesFr: '',
  });
  const { t } = useLanguage();

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
      titleEn: exp.titleEn || exp.title || '',
      titleFr: exp.titleFr || exp.title || '',
      companyEn: exp.companyEn || exp.company || '',
      companyFr: exp.companyFr || exp.company || '',
      locationEn: exp.locationEn || exp.location || '',
      locationFr: exp.locationFr || exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current,
      descriptionEn: exp.descriptionEn || exp.description || '',
      descriptionFr: exp.descriptionFr || exp.description || '',
      responsibilitiesEn: exp.responsibilitiesEn || exp.responsibilities || '',
      responsibilitiesFr: exp.responsibilitiesFr || exp.responsibilities || '',
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
      titleEn: '',
      titleFr: '',
      companyEn: '',
      companyFr: '',
      locationEn: '',
      locationFr: '',
      startDate: '',
      endDate: '',
      current: false,
      descriptionEn: '',
      descriptionFr: '',
      responsibilitiesEn: '',
      responsibilitiesFr: '',
    });
  };

  return (
    <div className="admin-page">
      <h1>{t('manageExperience')}</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? t('cancel') : t('addExperience')}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder={t('titleEn')}
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('titleFr')}
            value={formData.titleFr}
            onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('companyEn')}
            value={formData.companyEn}
            onChange={(e) => setFormData({ ...formData, companyEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('companyFr')}
            value={formData.companyFr}
            onChange={(e) => setFormData({ ...formData, companyFr: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder={t('locationEn')}
            value={formData.locationEn}
            onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
          />
          <input
            type="text"
            placeholder={t('locationFr')}
            value={formData.locationFr}
            onChange={(e) => setFormData({ ...formData, locationFr: e.target.value })}
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
            {t('currentlyWorking')}
          </label>
          <textarea
            placeholder={t('descriptionEn')}
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          />
          <textarea
            placeholder={t('descriptionFr')}
            value={formData.descriptionFr}
            onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
          />
          <textarea
            placeholder={t('responsibilitiesEn')}
            value={formData.responsibilitiesEn}
            onChange={(e) => setFormData({ ...formData, responsibilitiesEn: e.target.value })}
          />
          <textarea
            placeholder={t('responsibilitiesFr')}
            value={formData.responsibilitiesFr}
            onChange={(e) => setFormData({ ...formData, responsibilitiesFr: e.target.value })}
          />
          <button type="submit" className="btn-primary">
            {editingId ? t('update') : t('create')}
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>{t('titleEn')}</th>
            <th>{t('companyEn')}</th>
            <th>{t('locationEn')}</th>
            <th>{t('startDate')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.experienceId}>
              <td>{exp.titleEn || exp.title}</td>
              <td>{exp.companyEn || exp.company}</td>
              <td>{exp.locationEn || exp.location}</td>
              <td>{new Date(exp.startDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(exp)} className="btn-secondary">{t('edit')}</button>
                <button onClick={() => handleDelete(exp.experienceId)} className="btn-danger">{t('delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
