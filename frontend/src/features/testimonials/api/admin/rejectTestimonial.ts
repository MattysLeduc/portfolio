import axiosInstance from '../../../../shared/api/axiosInstance';
import type { TestimonialResponseModel } from '../../models/TestimonialResponseModel';

export async function rejectTestimonial(testimonialId: string, reason: string): Promise<TestimonialResponseModel> {
  const response = await axiosInstance.post<TestimonialResponseModel>(`/admin/testimonials/${testimonialId}/reject`, { reason });
  return response.data;
}
