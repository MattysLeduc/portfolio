import { supabase } from "@/lib/supabase";

const BUCKET_NAME =
  import.meta.env.VITE_SUPABASE_BUCKET_NAME || "project-images";

export interface ImageUploadResponse {
  imageUrl: string;
  message: string;
}

/**
 * Supabase Storage Service for handling image uploads
 */
export const supabaseStorageService = {
  /**
   * Upload an image to Supabase Storage
   * @param file - The image file to upload
   * @param folder - Optional folder path within the bucket (e.g., 'projects', 'profiles')
   * @returns Promise with the public URL of the uploaded image
   */
  uploadImage: async (
    file: File,
    folder: string = "projects",
  ): Promise<ImageUploadResponse> => {
    try {
      // Generate a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error(error.message);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      return {
        imageUrl: urlData.publicUrl,
        message: "Image uploaded successfully",
      };
    } catch (error) {
      console.error("Error uploading image to Supabase:", error);
      throw error;
    }
  },

  /**
   * Delete an image from Supabase Storage
   * @param imageUrl - The full URL of the image to delete
   * @returns Promise<void>
   */
  deleteImage: async (imageUrl: string): Promise<void> => {
    try {
      // Extract the file path from the URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split(
        `/storage/v1/object/public/${BUCKET_NAME}/`,
      );

      if (pathParts.length < 2) {
        console.warn("Could not parse image URL for deletion:", imageUrl);
        return;
      }

      const filePath = pathParts[1];

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error("Error deleting image from Supabase:", error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      // Don't throw - deletion failures shouldn't block the operation
    }
  },

  /**
   * Replace an existing image with a new one
   * @param oldImageUrl - URL of the image to replace (will be deleted)
   * @param newFile - New image file to upload
   * @param folder - Optional folder path
   * @returns Promise with the public URL of the new image
   */
  replaceImage: async (
    oldImageUrl: string | null,
    newFile: File,
    folder: string = "projects",
  ): Promise<ImageUploadResponse> => {
    // Upload the new image first
    const uploadResult = await supabaseStorageService.uploadImage(
      newFile,
      folder,
    );

    // If there was an old image, delete it (but don't fail if deletion fails)
    if (oldImageUrl) {
      try {
        await supabaseStorageService.deleteImage(oldImageUrl);
      } catch (error) {
        console.warn(
          "Failed to delete old image, but new image uploaded successfully:",
          error,
        );
      }
    }

    return uploadResult;
  },
};
