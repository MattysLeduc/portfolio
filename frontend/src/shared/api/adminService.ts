import apiClient from './axiosInstance';

export const projectsAdminService = {
  getAllProjects: async () => {
    const response = await apiClient.get('/admin/projects');
    return response.data.data;
  },
  createProject: async (project: any) => {
    const response = await apiClient.post('/admin/projects', project);
    return response.data.data;
  },
  updateProject: async (id: number, project: any) => {
    const response = await apiClient.put(`/admin/projects/${id}`, project);
    return response.data.data;
  },
  deleteProject: async (id: number) => {
    await apiClient.delete(`/admin/projects/${id}`);
  },
};

export const workExperienceAdminService = {
  getAllExperiences: async () => {
    const response = await apiClient.get('/admin/work-experiences');
    return response.data.data;
  },
  createExperience: async (experience: any) => {
    const response = await apiClient.post('/admin/work-experiences', experience);
    return response.data.data;
  },
  updateExperience: async (id: number, experience: any) => {
    const response = await apiClient.put(`/admin/work-experiences/${id}`, experience);
    return response.data.data;
  },
  deleteExperience: async (id: number) => {
    await apiClient.delete(`/admin/work-experiences/${id}`);
  },
};

export const educationAdminService = {
  getAllEducation: async () => {
    const response = await apiClient.get('/admin/education');
    return response.data.data;
  },
  createEducation: async (education: any) => {
    const response = await apiClient.post('/admin/education', education);
    return response.data.data;
  },
  updateEducation: async (id: number, education: any) => {
    const response = await apiClient.put(`/admin/education/${id}`, education);
    return response.data.data;
  },
  deleteEducation: async (id: number) => {
    await apiClient.delete(`/admin/education/${id}`);
  },
};

export const contactAdminService = {
  getContactInfo: async () => {
    const response = await apiClient.get('/admin/contact/info');
    return response.data.data;
  },
  updateContactInfo: async (contactInfo: any) => {
    const response = await apiClient.put('/admin/contact/info', contactInfo);
    return response.data.data;
  },
  getAllMessages: async () => {
    const response = await apiClient.get('/admin/contact/messages');
    return response.data.data;
  },
  markMessageAsRead: async (id: number) => {
    const response = await apiClient.put(`/admin/contact/messages/${id}/read`);
    return response.data.data;
  },
  deleteMessage: async (id: number) => {
    await apiClient.delete(`/admin/contact/messages/${id}`);
  },
};

export const testimonialsAdminService = {
  getAllTestimonials: async () => {
    const response = await apiClient.get('/admin/testimonials');
    return response.data.data;
  },
  getPendingTestimonials: async () => {
    const response = await apiClient.get('/admin/testimonials/pending');
    return response.data.data;
  },
  approveTestimonial: async (id: number) => {
    const response = await apiClient.post(`/admin/testimonials/${id}/approve`);
    return response.data.data;
  },
  rejectTestimonial: async (id: number, reason: string) => {
    const response = await apiClient.post(`/admin/testimonials/${id}/reject`, { reason });
    return response.data.data;
  },
  deleteTestimonial: async (id: number) => {
    await apiClient.delete(`/admin/testimonials/${id}`);
  },
};

export const resumeAdminService = {
  getActiveResume: async () => {
    const response = await apiClient.get('/admin/resume');
    return response.data.data;
  },
  uploadResume: async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    const response = await apiClient.post('/admin/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
  activateResume: async (id: number) => {
    const response = await apiClient.post(`/admin/resume/${id}/activate`);
    return response.data.data;
  },
  deleteResume: async (id: number) => {
    await apiClient.delete(`/admin/resume/${id}`);
  },
};
