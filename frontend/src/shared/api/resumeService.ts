import { supabaseStorageService } from "./supabaseStorageService";

export interface ResumeUploadResponse {
  fileUrl: string;
  fileName: string;
  message: string;
}

/**
 * Resume Service - Uses Supabase Storage for resume PDF uploads
 *
 * Stores resumes in the 'resumes' folder of the same bucket as images
 */
export const resumeService = {
  /**
   * Upload a resume file (PDF)
   * @param file - The PDF file to upload
   * @param language - Language code ('en' or 'fr')
   * @returns Promise with the uploaded file URL and metadata
   */
  uploadResume: async (
    file: File,
    language: "en" | "fr",
  ): Promise<ResumeUploadResponse> => {
    // Validate file type
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed for resumes");
    }

    // Validate file size (10MB max for resumes)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error("Resume file size must be less than 10MB");
    }

    try {
      // Upload to Supabase in 'resumes' folder with language-specific naming
      const result = await supabaseStorageService.uploadImage(
        file,
        `resumes/${language}`,
      );

      return {
        fileUrl: result.imageUrl,
        fileName: file.name,
        message: "Resume uploaded successfully",
      };
    } catch (error) {
      console.error("Error uploading resume:", error);
      throw error;
    }
  },

  /**
   * Delete a resume file
   * @param fileUrl - The URL of the resume to delete
   */
  deleteResume: async (fileUrl: string): Promise<void> => {
    return await supabaseStorageService.deleteImage(fileUrl);
  },

  /**
   * Replace an existing resume with a new one
   * @param oldFileUrl - URL of the resume to replace
   * @param newFile - New resume file
   * @param language - Language code
   */
  replaceResume: async (
    oldFileUrl: string | null,
    newFile: File,
    language: "en" | "fr",
  ): Promise<ResumeUploadResponse> => {
    // Validate file
    if (newFile.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed for resumes");
    }

    const maxSize = 10 * 1024 * 1024;
    if (newFile.size > maxSize) {
      throw new Error("Resume file size must be less than 10MB");
    }

    try {
      const result = await supabaseStorageService.replaceImage(
        oldFileUrl,
        newFile,
        `resumes/${language}`,
      );

      return {
        fileUrl: result.imageUrl,
        fileName: newFile.name,
        message: "Resume replaced successfully",
      };
    } catch (error) {
      console.error("Error replacing resume:", error);
      throw error;
    }
  },
};
