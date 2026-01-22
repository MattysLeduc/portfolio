import axiosInstance from '../../../shared/api/axiosInstance';
import type { ProjectRequestModel } from '../models/ProjectRequestModel';
import type { ProjectResponseModel } from '../models/ProjectResponseModel';

export async function createProject(payload: ProjectRequestModel): Promise<ProjectResponseModel> {
  const response = await axiosInstance.post<ProjectResponseModel>('/v1/projects', payload);
  return response.data;
}
