export interface EducationResponseModel {
  educationId: string;
  degreeEn: string;
  degreeFr: string;
  institutionEn: string;
  institutionFr: string;
  locationEn: string;
  locationFr: string;
  descriptionEn: string;
  descriptionFr: string;
  startDate: string; // ISO date
  endDate: string | null; // ISO date or null
}
