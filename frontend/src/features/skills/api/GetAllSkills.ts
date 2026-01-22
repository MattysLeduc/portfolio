import axiosInstance from '../../../shared/api/axiosInstance';
import type { SkillResponseModel } from '../models/SkillResponseModel';

export async function getAllSkills(): Promise<SkillResponseModel[]> {
  const response = await axiosInstance.get('/v1/skills');
  return response.data;
}
