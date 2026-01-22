import { useEffect, useState } from 'react';
import { getAllEducation } from '../../education/api/getAllEducation';
import { createEducation } from '../../education/api/createEducation';
import { updateEducation } from '../../education/api/updateEducation';
import { deleteEducation } from '../../education/api/deleteEducation';
import type { EducationResponseModel } from '../../education/models/EducationResponseModel';
import type { EducationRequestModel } from '../../education/models/EducationRequestModel';
import './AdminEducationPage.css';

export const AdminEducationPage: React.FC = () => {
  const [education, setEducation] = useState<EducationResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EducationRequestModel>({
    degreeEn: '',
    degreeFr: '',
    institutionEn: '',
    institutionFr: '',
    locationEn: '',
    locationFr: '',
    descriptionEn: '',
    descriptionFr: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await getAllEducation();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEducation(editingId, formData);
      } else {
        await createEducation(formData);
      }
      resetForm();
      fetchEducation();
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleEdit = (edu: EducationResponseModel) => {
    setEditingId(edu.educationId);
    setFormData({
      degreeEn: edu.degreeEn,
      degreeFr: edu.degreeFr,
      institutionEn: edu.institutionEn,
      institutionFr: edu.institutionFr,
      locationEn: edu.locationEn,
      locationFr: edu.locationFr,
      descriptionEn: edu.descriptionEn,
      descriptionFr: edu.descriptionFr,
      startDate: edu.startDate,
      endDate: edu.endDate || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteEducation(id);
        fetchEducation();
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      degreeEn: '',
      degreeFr: '',
      institutionEn: '',
      institutionFr: '',
      locationEn: '',
      locationFr: '',
      descriptionEn: '',
      descriptionFr: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="admin-page">
      <h1>Manage Education</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add Education'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Degree (EN)"
            value={formData.degreeEn}
            onChange={(e) => setFormData({ ...formData, degreeEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Degree (FR)"
            value={formData.degreeFr}
            onChange={(e) => setFormData({ ...formData, degreeFr: e.target.value })}
          />
          <input
            type="text"
            placeholder="Institution (EN)"
            value={formData.institutionEn}
            onChange={(e) => setFormData({ ...formData, institutionEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Institution (FR)"
            value={formData.institutionFr}
            onChange={(e) => setFormData({ ...formData, institutionFr: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location (EN)"
            value={formData.locationEn}
            onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location (FR)"
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
            value={formData.endDate || ''}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
          <textarea
            placeholder="Description (EN)"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
          />
          <textarea
            placeholder="Description (FR)"
            value={formData.descriptionFr}
            onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
          />
          <button type="submit" className="btn-primary">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Degree</th>
            <th>Institution</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => (
            <tr key={edu.educationId}>
              <td>{edu.degreeEn}</td>
              <td>{edu.institutionEn}</td>
              <td>{new Date(edu.startDate).toLocaleDateString()}</td>
              <td>{edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(edu)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(edu.educationId)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
