import axiosInstance from '../../../shared/api/axiosInstance';
import type { TestimonialResponseModel } from '../models/TestimonialResponseModel';

export async function getTestimonials(): Promise<TestimonialResponseModel[]> {
  const response = await axiosInstance.get('/public/testimonials');
  return response.data;
}
