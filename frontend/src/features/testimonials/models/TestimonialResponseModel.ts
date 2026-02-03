export interface TestimonialResponseModel {
  [key: string]: any;
  testimonialId: string;
  name?: string;
  authorName: string;
  role?: string;
  authorTitle?: string;
  authorTitleEn?: string;
  authorTitleFr?: string;
  position?: string;
  company?: string;
  authorImage?: string;
  content: string;
  contentEn?: string;
  contentFr?: string;
  message?: string;
  rating: number;
  createdAt?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}
