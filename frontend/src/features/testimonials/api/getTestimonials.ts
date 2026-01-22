import axiosInstance from '../../../shared/api/axiosInstance';
import type { TestimonialResponseModel } from '../models/TestimonialResponseModel';

export async function getTestimonials(): Promise<TestimonialResponseModel[]> {
  // Base URL already includes /api, so we call the public path without duplicating /api
  const response = await axiosInstance.get('/public/testimonials');
  return response.data;
}
