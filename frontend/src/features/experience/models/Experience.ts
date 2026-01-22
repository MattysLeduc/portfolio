export type Experience = {
  experienceId: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description?: string;
};
