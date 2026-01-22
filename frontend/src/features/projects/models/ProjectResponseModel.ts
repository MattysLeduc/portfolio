export interface ProjectResponseModel {
  projectId: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  imageUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
}
