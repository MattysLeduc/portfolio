import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProjectResponseModel } from '../models/ProjectResponseModel';

export async function getAllProjects(): Promise<ProjectResponseModel[]> {
  const response = await axiosInstance.get('/v1/projects');
  return response.data;
}
