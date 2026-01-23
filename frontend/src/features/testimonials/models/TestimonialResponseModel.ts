export interface TestimonialResponseModel {
  testimonialId: string;
  name?: string;
  authorName: string;
  role?: string;
  authorTitle?: string;
  position?: string;
  company?: string;
  authorImage?: string;
  content: string;
  message?: string;
  rating: number;
  createdAt?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}
