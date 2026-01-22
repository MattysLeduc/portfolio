import axiosInstance from '../../../../shared/api/axiosInstance';
import type { TestimonialResponseModel } from '../../models/TestimonialResponseModel';

export async function getPendingTestimonials(): Promise<TestimonialResponseModel[]> {
  const response = await axiosInstance.get('/admin/testimonials/pending');
  return response.data;
}
