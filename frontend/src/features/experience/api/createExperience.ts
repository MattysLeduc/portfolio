import axiosInstance from '../../../shared/api/axiosInstance';
import type { Experience } from '../models/Experience';

export async function createExperience(experience: Omit<Experience, 'experienceId'>): Promise<Experience> {
  const response = await axiosInstance.post('/admin/experiences', experience);
  return response.data;
}
