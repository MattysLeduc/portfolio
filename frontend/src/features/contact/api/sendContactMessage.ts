import axiosInstance from '../../../shared/api/axiosInstance';
import type { ContactMessageRequestModel } from '../models/ContactMessageRequestModel';
import type { ContactMessageResponseModel } from '../models/ContactMessageResponseModel';

export async function sendContactMessage(payload: ContactMessageRequestModel): Promise<ContactMessageResponseModel> {
  const response = await axiosInstance.post<ContactMessageResponseModel>('/public/contact/messages', payload);
  return response.data;
}
