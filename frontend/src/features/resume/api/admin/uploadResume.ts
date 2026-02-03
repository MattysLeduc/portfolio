import axiosInstance from "../../../../shared/api/axiosInstance";
import type { ResumeInfoResponseModel } from "../../models/ResumeInfoResponseModel";

export async function uploadResume(
  language: "en" | "fr",
  file: File,
): Promise<ResumeInfoResponseModel> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("lang", language);

  const response = await axiosInstance.post<ResumeInfoResponseModel>(
    "/admin/resume/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
}
