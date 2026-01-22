import axiosInstance from '../../../../shared/api/axiosInstance';

export async function deleteTestimonial(testimonialId: string): Promise<void> {
  await axiosInstance.delete(`/admin/testimonials/${testimonialId}`);
}
