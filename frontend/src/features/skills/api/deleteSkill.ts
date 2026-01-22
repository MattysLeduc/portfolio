import axiosInstance from '../../../shared/api/axiosInstance';

export async function deleteSkill(skillId: string): Promise<void> {
  await axiosInstance.delete(`/v1/skills/${skillId}`);
}