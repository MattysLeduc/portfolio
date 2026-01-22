import axiosInstance from '../../../shared/api/axiosInstance';
import type { EducationRequestModel } from '../models/EducationRequestModel';
import type { EducationResponseModel } from '../models/EducationResponseModel';

export async function updateEducation(educationId: string, payload: EducationRequestModel): Promise<EducationResponseModel> {
  const response = await axiosInstance.put<EducationResponseModel>(`/v1/education/${educationId}`, payload);
  return response.data;
}
