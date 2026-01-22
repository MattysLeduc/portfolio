import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProjectRequestModel } from '../models/ProjectRequestModel';
import type { ProjectResponseModel } from '../models/ProjectResponseModel';

export async function updateProject(projectId: string, payload: ProjectRequestModel): Promise<ProjectResponseModel> {
  const response = await axiosInstance.put<ProjectResponseModel>(`/v1/projects/${projectId}`, payload);
  return response.data;
}
