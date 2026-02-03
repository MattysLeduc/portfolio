import axiosInstance from '../../../../shared/api/axiosInstance';
import type { ResumeInfoResponseModel } from '../../models/ResumeInfoResponseModel';

export async function getResumeInfo(language: "en" | "fr"): Promise<ResumeInfoResponseModel> {
  const response = await axiosInstance.get<ResumeInfoResponseModel>(`/admin/resume`, {
    params: { lang: language },
  });
  return response.data;
}
