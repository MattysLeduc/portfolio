import axiosInstance from '../../../shared/api/axiosInstance';

export async function deleteProject(projectId: string): Promise<void> {
  await axiosInstance.delete(`/v1/projects/${projectId}`);
}
