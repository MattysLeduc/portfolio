import axiosInstance from '../../../shared/api/axiosInstance';
import type { SkillResponseModel } from '../models/SkillResponseModel';

export async function getSkillById(skillId: string): Promise<SkillResponseModel> {
  const response = await axiosInstance.get(`/skills/${skillId}`);
  return response.data;
}