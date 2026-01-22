import axiosInstance from '../../../shared/api/axiosInstance';
import type { HobbyRequestModel } from '../models/HobbyRequestModel';
import type { HobbyResponseModel } from '../models/HobbyResponseModel';

export async function updateHobby(hobbyId: string, hobbyData: HobbyRequestModel): Promise<HobbyResponseModel> {
  const response = await axiosInstance.put<HobbyResponseModel>(`/v1/hobbies/${hobbyId}`, hobbyData);
  return response.data;
}
