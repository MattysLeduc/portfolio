import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProjectResponseModel } from '../models/ProjectResponseModel';

export async function getFeaturedProjects(): Promise<ProjectResponseModel[]> {
  const response = await axiosInstance.get('/v1/projects/featured');
  return response.data;
}
