import axiosInstance from '../../../shared/api/axiosInstance';
import type { EducationResponseModel } from '../models/EducationResponseModel';

export async function getEducationById(educationId: string): Promise<EducationResponseModel> {
  const response = await axiosInstance.get(`/v1/education/${educationId}`);
  return response.data;
}
