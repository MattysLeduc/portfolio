import axiosInstance from '../../../shared/api/axiosInstance';
import type { ContactInfoResponseModel } from '../models/ContactInfoResponseModel';

export async function getContactInfo(): Promise<ContactInfoResponseModel> {
  const response = await axiosInstance.get('/public/contact');
  return response.data;
}
