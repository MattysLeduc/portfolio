import axiosInstance from '../../../shared/api/axiosInstance';
import type { TestimonialRequestModel } from '../models/TestimonialRequestModel';
import type { TestimonialResponseModel } from '../models/TestimonialResponseModel';

export async function submitTestimonial(payload: TestimonialRequestModel): Promise<TestimonialResponseModel> {
  const response = await axiosInstance.post<TestimonialResponseModel>('/public/testimonials', payload);
  return response.data;
}
