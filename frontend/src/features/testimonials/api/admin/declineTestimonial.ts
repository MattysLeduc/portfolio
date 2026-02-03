import axiosInstance from "../../../../shared/api/axiosInstance";

export async function declineTestimonial(
  testimonialId: string,
  reason?: string,
): Promise<void> {
  await axiosInstance.patch(`/admin/testimonials/${testimonialId}/decline`, {
    reason,
  });
}
