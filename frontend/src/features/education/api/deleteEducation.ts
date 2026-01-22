import axiosInstance from '../../../shared/api/axiosInstance';

export async function deleteEducation(educationId: string): Promise<void> {
  await axiosInstance.delete(`/v1/education/${educationId}`);
}
