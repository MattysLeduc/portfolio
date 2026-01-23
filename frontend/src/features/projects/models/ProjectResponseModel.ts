export interface ProjectResponseModel {
  projectId: string;
  title?: string;
  nameEn: string;
  nameFr: string;
  description?: string;
  descriptionEn: string;
  descriptionFr: string;
  imageUrl?: string;
  tech?: string[];
  technologies?: string;
  github?: string;
  repoUrl?: string;
  live?: string;
  demoUrl?: string;
  featured: boolean;
}
