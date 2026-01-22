import axiosInstance from '../../../shared/api/axiosInstance';
import type { EducationRequestModel } from '../models/EducationRequestModel';
import type { EducationResponseModel } from '../models/EducationResponseModel';

export async function createEducation(payload: EducationRequestModel): Promise<EducationResponseModel> {
  const response = await axiosInstance.post<EducationResponseModel>('/v1/education', payload);
  return response.data;
}
