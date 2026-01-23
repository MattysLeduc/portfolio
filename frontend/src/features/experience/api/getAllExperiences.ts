import axiosInstance from '../../../shared/api/axiosInstance';
import type { Experience } from '../models/Experience';

export async function getAllExperiences(): Promise<Experience[]> {
  const response = await axiosInstance.get('/admin/experiences');
  return response.data;
}
