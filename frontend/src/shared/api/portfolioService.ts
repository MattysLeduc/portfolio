import axiosInstance from './axiosInstance';

export const portfolioService = {
  getPortfolioSummary: async () => {
    const response = await axiosInstance.get('/public/portfolio');
    return response.data.data;
  },

  getSkills: async () => {
    const response = await axiosInstance.get('/skills');
    return response.data.data;
  },

  getProjects: async () => {
    const response = await axiosInstance.get('/public/projects');
    return response.data.data;
  },

  getFeaturedProjects: async () => {
    const response = await axiosInstance.get('/public/projects/featured');
    return response.data.data;
  },

  getExperiences: async () => {
    const response = await axiosInstance.get('/public/experiences');
    return response.data.data;
  },

  // Alias retained for backwards compatibility in UI calls.
  getWorkExperiences: async () => {
    const response = await axiosInstance.get('/public/experiences');
    return response.data.data;
  },

  getEducation: async () => {
    const response = await axiosInstance.get('/public/education');
    return response.data.data;
  },

  getHobbies: async () => {
    const response = await axiosInstance.get('/public/hobbies');
    return response.data.data;
  },

  getTestimonials: async () => {
    const response = await axiosInstance.get('/public/testimonials');
    return response.data.data;
  },

  submitTestimonial: async (payload: {
    name: string;
    email: string;
    company?: string;
    position?: string;
    message: string;
  }) => {
    const response = await axiosInstance.post('/public/testimonials', payload);
    return response.data;
  },

  getContactInfo: async () => {
    const response = await axiosInstance.get('/public/contact');
    return response.data.data;
  },

  sendContactMessage: async (payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    const response = await axiosInstance.post('/public/contact/messages', payload);
    return response.data;
  },

  downloadResume: async (language: string) => {
    return axiosInstance.get('/public/resume', {
      params: { lang: language },
      responseType: 'blob',
    });
  },
};
