import axiosInstance from '../../../../shared/api/axiosInstance';
import type { SkillRequestModel } from '../../models/SkillRequestModel';
import type { SkillResponseModel } from '../../models/SkillResponseModel';

export async function createSkillAdmin(skillData: SkillRequestModel): Promise<SkillResponseModel> {
  const response = await axiosInstance.post<SkillResponseModel>('/admin/v1/skills', skillData);
  return response.data;
}
