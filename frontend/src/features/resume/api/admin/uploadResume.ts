import { resumeService } from "@/shared/api/resumeService";
import type { ResumeInfoResponseModel } from "../../models/ResumeInfoResponseModel";

export async function uploadResume(
  language: "en" | "fr",
  file: File,
): Promise<ResumeInfoResponseModel & { fileUrl: string }> {
  // Upload to Supabase Storage
  const result = await resumeService.uploadResume(file, language);
  
  // Return in the expected format with the URL
  return {
    language,
    fileName: result.fileName,
    sizeBytes: file.size,
    updatedAt: new Date().toISOString(),
    fileUrl: result.fileUrl,
  };
}
