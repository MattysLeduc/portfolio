import apiClient from './axiosInstance';

export const portfolioService = {
  // Portfolio Summary
  getPortfolioSummary: async () => {
    const response = await apiClient.get('/public/portfolio');
    return response.data.data;
  },

  // Skills
  getSkills: async () => {
    const response = await apiClient.get('/v1/skills');
    return response.data;
  },

  // Projects
  getProjects: async () => {
    const response = await apiClient.get('/v1/projects');
    return response.data;
  },

  getFeaturedProjects: async () => {
    const response = await apiClient.get('/v1/projects/featured');
    return response.data;
  },

  // Experiences
  getExperiences: async () => {
    const response = await apiClient.get('/public/experiences');
    return response.data;
  },

  // Alias to keep backward compatibility with UI naming.
  getWorkExperiences: async () => {
    const response = await apiClient.get('/public/experiences');
    return response.data;
  },

  // Education
  getEducation: async () => {
    const response = await apiClient.get('/v1/education');
    return response.data;
  },

  // Hobbies
  getHobbies: async () => {
    const response = await apiClient.get('/v1/hobbies');
    return response.data;
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await apiClient.get('/public/testimonials');
    return response.data;
  },

  // Contact
  submitContact: async (data: { name: string; email: string; message: string }) => {
    const response = await apiClient.post('/public/contact', data);
    return response.data;
  },

  // Resume
  downloadResume: async (language: string) => {
    return apiClient.get('/public/resume', {
      params: { lang: language },
      responseType: 'blob',
    });
  },
};
