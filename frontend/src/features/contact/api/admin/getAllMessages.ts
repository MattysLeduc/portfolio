import axiosInstance from '../../../../shared/api/axiosInstance';
import type { ContactMessageResponseModel } from '../../models/ContactMessageResponseModel';

export async function getAllMessages(): Promise<ContactMessageResponseModel[]> {
  const response = await axiosInstance.get('/admin/contact/messages');
  return response.data;
}
