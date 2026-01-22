import axiosInstance from '../../../shared/api/axiosInstance';
import type { HobbyResponseModel } from '../models/HobbyResponseModel';

export async function getAllHobbies(): Promise<HobbyResponseModel[]> {
  const response = await axiosInstance.get('/v1/hobbies');
  return response.data;
}
