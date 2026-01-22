import axiosInstance from '../../../../shared/api/axiosInstance';
import type { ContactInfoRequestModel } from '../../models/ContactInfoRequestModel';
import type { ContactInfoResponseModel } from '../../models/ContactInfoResponseModel';

export async function updateContactInfo(payload: ContactInfoRequestModel): Promise<ContactInfoResponseModel> {
  const response = await axiosInstance.put<ContactInfoResponseModel>('/admin/contact/info', payload);
  return response.data;
}
