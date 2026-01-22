import apiClient from './axiosInstance';

export const portfolioService = {
  getPortfolioSummary: async () => {
    const response = await apiClient.get('/public/portfolio');
    return response.data.data;
  },

  getExperiences: async () => {
    const response = await apiClient.get('/public/experiences');
    return response.data;
  },

  // Alias to keep backward compatibility with UI naming.
  getWorkExperiences: async () => {
    const response = await apiClient.get('/public/experiences');
    return response.data;
  },


  downloadResume: async (language: string) => {
    return apiClient.get('/public/resume', {
      params: { lang: language },
      responseType: 'blob',
    });
  },
};
