export interface EducationResponseModel {
  educationId: string;
  degree?: string;
  degreeEn: string;
  degreeFr: string;
  institution?: string;
  institutionEn: string;
  institutionFr: string;
  locationEn: string;
  locationFr: string;
  description?: string;
  descriptionEn: string;
  descriptionFr: string;
  startDate: string; // ISO date
  endDate: string | null; // ISO date or null
  period?: string;
  gpa?: string;
  type?: string;
}
