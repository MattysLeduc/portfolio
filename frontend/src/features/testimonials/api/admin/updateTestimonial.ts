import axiosInstance from '../../../../shared/api/axiosInstance';
import type { TestimonialRequestModel } from '../../models/TestimonialRequestModel';
import type { TestimonialResponseModel } from '../../models/TestimonialResponseModel';

export async function updateTestimonial(testimonialId: string, payload: TestimonialRequestModel): Promise<TestimonialResponseModel> {
  const response = await axiosInstance.put<TestimonialResponseModel>(`/v1/testimonials/${testimonialId}`, payload);
  return response.data;
}
