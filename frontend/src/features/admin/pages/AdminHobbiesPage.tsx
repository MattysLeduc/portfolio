import { useEffect, useState } from 'react';
import { getAllHobbies } from '../../hobbies/api/getAllHobbies';
import { createHobby } from '../../hobbies/api/createHobby';
import { updateHobby } from '../../hobbies/api/updateHobby';
import { deleteHobby } from '../../hobbies/api/deleteHobby';
import type { HobbyResponseModel } from '../../hobbies/models/HobbyResponseModel';
import type { HobbyRequestModel } from '../../hobbies/models/HobbyRequestModel';
import './AdminHobbiesPage.css';

export const AdminHobbiesPage: React.FC = () => {
  const [hobbies, setHobbies] = useState<HobbyResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<HobbyRequestModel>({
    nameEn: '',
    nameFr: '',
    descriptionEn: '',
    descriptionFr: '',
    iconUrl: '',
  });

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const data = await getAllHobbies();
      setHobbies(data);
    } catch (error) {
      console.error('Error fetching hobbies:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateHobby(editingId, formData);
      } else {
        await createHobby(formData);
      }
      resetForm();
      fetchHobbies();
    } catch (error) {
      console.error('Error saving hobby:', error);
    }
  };

  const handleEdit = (hobby: HobbyResponseModel) => {
    setEditingId(hobby.hobbyId);
    setFormData({
      nameEn: hobby.nameEn,
      nameFr: hobby.nameFr,
      descriptionEn: hobby.descriptionEn,
      descriptionFr: hobby.descriptionFr,
      iconUrl: hobby.iconUrl || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteHobby(id);
        fetchHobbies();
      } catch (error) {
        console.error('Error deleting hobby:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      nameEn: '',
      nameFr: '',
      descriptionEn: '',
      descriptionFr: '',
      iconUrl: '',
    });
  };

  return (
    <div className="admin-page">
      <h1>Manage Hobbies</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add Hobby'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Hobby Name (EN)"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Hobby Name (FR)"
            value={formData.nameFr}
            onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
            required
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
          <input
            type="text"
            placeholder="Icon URL"
            value={formData.iconUrl}
            onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
          />
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hobbies.map((hobby) => (
            <tr key={hobby.hobbyId}>
              <td>{hobby.nameEn}</td>
              <td>{hobby.descriptionEn?.substring(0, 50)}...</td>
              <td>
                <button onClick={() => handleEdit(hobby)} className="btn-secondary">
                  Edit
                </button>
                <button onClick={() => handleDelete(hobby.hobbyId)} className="btn-danger">
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
