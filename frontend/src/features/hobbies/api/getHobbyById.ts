import axiosInstance from '../../../shared/api/axiosInstance';
import type { HobbyResponseModel } from '../models/HobbyResponseModel';

export async function getHobbyById(hobbyId: string): Promise<HobbyResponseModel> {
  const response = await axiosInstance.get(`/v1/hobbies/${hobbyId}`);
  return response.data;
}
