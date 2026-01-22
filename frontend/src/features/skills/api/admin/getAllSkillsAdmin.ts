import axiosInstance from '../../../../shared/api/axiosInstance';
import type { SkillResponseModel } from '../../models/SkillResponseModel';

export async function getAllSkillsAdmin(): Promise<SkillResponseModel[]> {
  const response = await axiosInstance.get('/admin/v1/skills');
  return response.data;
}
