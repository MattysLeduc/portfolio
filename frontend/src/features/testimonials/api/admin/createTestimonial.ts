import axiosInstance from "../../../../shared/api/axiosInstance";
import type { TestimonialRequestModel } from "../../models/TestimonialRequestModel";
import type { TestimonialResponseModel } from "../../models/TestimonialResponseModel";

export async function createTestimonial(
  payload: TestimonialRequestModel,
): Promise<TestimonialResponseModel> {
  const response = await axiosInstance.post<TestimonialResponseModel>(
    "/v1/testimonials",
    payload,
  );
  return response.data;
}
