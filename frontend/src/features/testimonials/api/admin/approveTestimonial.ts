import axiosInstance from '../../../../shared/api/axiosInstance';
import type { TestimonialResponseModel } from '../../models/TestimonialResponseModel';

export async function approveTestimonial(testimonialId: string): Promise<TestimonialResponseModel> {
  const response = await axiosInstance.post<TestimonialResponseModel>(`/admin/testimonials/${testimonialId}/approve`);
  return response.data;
}
