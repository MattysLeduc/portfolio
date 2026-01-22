import axiosInstance from '../../../../shared/api/axiosInstance';
import type { ContactMessageResponseModel } from '../../models/ContactMessageResponseModel';

export async function markMessageAsRead(messageId: string): Promise<ContactMessageResponseModel> {
  const response = await axiosInstance.put<ContactMessageResponseModel>(`/admin/contact/messages/${messageId}/read`);
  return response.data;
}
