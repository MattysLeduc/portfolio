import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProjectResponseModel } from '../models/ProjectResponseModel';

export async function getProjectById(projectId: string): Promise<ProjectResponseModel> {
  const response = await axiosInstance.get(`/v1/projects/${projectId}`);
  return response.data;
}
