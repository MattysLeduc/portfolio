import axiosInstance from '../../../shared/api/axiosInstance';

export async function deleteExperience(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/experiences/${id}`);
}
