export interface TestimonialResponseModel {
  testimonialId: string;
  authorName: string;
  authorTitle?: string;
  authorImage?: string;
  content: string;
  rating: number;
  createdAt?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}
