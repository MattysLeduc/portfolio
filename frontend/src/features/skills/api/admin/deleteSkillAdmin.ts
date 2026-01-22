import axiosInstance from '../../../../shared/api/axiosInstance';

export async function deleteSkillAdmin(skillId: string): Promise<void> {
  await axiosInstance.delete(`/admin/v1/skills/${skillId}`);
}
