export interface SkillResponseModel {
  [key: string]: any;
  skillId: string;
  name: string;
  nameEn?: string;
  nameFr?: string;
  description: string;
  descriptionEn?: string;
  descriptionFr?: string;
  category?: string;
  level?: number;
}
