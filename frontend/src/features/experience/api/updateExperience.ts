import axiosInstance from '../../../shared/api/axiosInstance';
import type { Experience } from '../models/Experience';

export async function updateExperience(id: string, experience: Omit<Experience, 'experienceId'>): Promise<Experience> {
  const response = await axiosInstance.put(`/admin/experiences/${id}`, experience);
  return response.data;
}
