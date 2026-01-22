import axiosInstance from "../../../shared/api/axiosInstance";
import type { SkillRequestModel } from "../models/SkillRequestModel";
import type { SkillResponseModel } from "../models/SkillResponseModel";

export async function updateSkill(
  skillId: string,
  requestModel: SkillRequestModel,
): Promise<SkillResponseModel> {
  const response = await axiosInstance.put(`/v1/skills/${skillId}`, requestModel);
  return response.data;
}
