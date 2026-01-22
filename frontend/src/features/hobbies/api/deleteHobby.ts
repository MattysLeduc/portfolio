import axiosInstance from '../../../shared/api/axiosInstance';

export async function deleteHobby(hobbyId: string): Promise<void> {
  await axiosInstance.delete(`/v1/hobbies/${hobbyId}`);
}
