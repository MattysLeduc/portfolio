import { supabaseStorageService } from "./supabaseStorageService";

export interface ImageUploadResponse {
  imageUrl: string;
  message: string;
}

/**
 * Image Service - Uses Supabase Storage for image uploads
 * 
 * This service provides a unified interface for image uploads,
 * currently using Supabase Storage as the backend.
 */
export const imageService = {
  /**
   * Upload an image file
   * @param file - The image file to upload
   * @param folder - Optional folder to organize images (default: 'projects')
   * @returns Promise with the uploaded image URL
   */
  uploadImage: async (
    file: File,
    folder: string = 'projects'
  ): Promise<ImageUploadResponse> => {
    return await supabaseStorageService.uploadImage(file, folder);
  },

  /**
   * Delete an image
   * @param imageUrl - The URL of the image to delete
   */
  deleteImage: async (imageUrl: string): Promise<void> => {
    return await supabaseStorageService.deleteImage(imageUrl);
  },

  /**
   * Replace an existing image with a new one
   * @param oldImageUrl - URL of the image to replace
   * @param newFile - New image file
   * @param folder - Optional folder path
   */
  replaceImage: async (
    oldImageUrl: string | null,
    newFile: File,
    folder: string = 'projects'
  ): Promise<ImageUploadResponse> => {
    return await supabaseStorageService.replaceImage(oldImageUrl, newFile, folder);
  },
};
