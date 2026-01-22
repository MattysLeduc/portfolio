import axiosInstance from '../../../shared/api/axiosInstance';
import type { HobbyRequestModel } from '../models/HobbyRequestModel';
import type { HobbyResponseModel } from '../models/HobbyResponseModel';

export async function createHobby(hobbyData: HobbyRequestModel): Promise<HobbyResponseModel> {
  const response = await axiosInstance.post<HobbyResponseModel>('/v1/hobbies', hobbyData);
  return response.data;
}
