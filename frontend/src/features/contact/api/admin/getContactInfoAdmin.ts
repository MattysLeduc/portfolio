import axiosInstance from '../../../../shared/api/axiosInstance';
import type { ContactInfoResponseModel } from '../../models/ContactInfoResponseModel';

export async function getContactInfoAdmin(): Promise<ContactInfoResponseModel> {
  const response = await axiosInstance.get('/admin/contact/info');
  return response.data;
}
