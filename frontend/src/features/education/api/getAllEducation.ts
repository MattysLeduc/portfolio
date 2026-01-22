import axiosInstance from '../../../shared/api/axiosInstance';
import type { EducationResponseModel } from '../models/EducationResponseModel';

export async function getAllEducation(): Promise<EducationResponseModel[]> {
  const response = await axiosInstance.get('/v1/education');
  return response.data;
}
