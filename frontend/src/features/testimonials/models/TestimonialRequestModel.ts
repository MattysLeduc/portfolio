export interface TestimonialRequestModel {
  authorName: string;
  authorTitle?: string;
  authorTitleEn?: string;
  authorTitleFr?: string;
  authorImage?: string;
  content?: string;
  contentEn: string;
  contentFr: string;
  rating: number;
  company?: string;
  companyEn?: string;
  companyFr?: string;
}
