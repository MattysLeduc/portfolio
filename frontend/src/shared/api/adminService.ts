import axiosInstance from './axiosInstance';

export const skillsAdminService = {
  getAllSkills: async () => {
    const response = await axiosInstance.get('/admin/skills');
    return response.data.data;
  },
  createSkill: async (skill: any) => {
    const response = await axiosInstance.post('/admin/skills', skill);
    return response.data.data;
  },
  updateSkill: async (id: number, skill: any) => {
    const response = await axiosInstance.put(`/admin/skills/${id}`, skill);
    return response.data.data;
  },
  deleteSkill: async (id: number) => {
    await axiosInstance.delete(`/admin/skills/${id}`);
  },
};

export const projectsAdminService = {
  getAllProjects: async () => {
    const response = await axiosInstance.get('/admin/projects');
    return response.data.data;
  },
  createProject: async (project: any) => {
    const response = await axiosInstance.post('/admin/projects', project);
    return response.data.data;
  },
  updateProject: async (id: number, project: any) => {
    const response = await axiosInstance.put(`/admin/projects/${id}`, project);
    return response.data.data;
  },
  deleteProject: async (id: number) => {
    await axiosInstance.delete(`/admin/projects/${id}`);
  },
};

export const workExperienceAdminService = {
  getAllExperiences: async () => {
    const response = await axiosInstance.get('/admin/work-experiences');
    return response.data.data;
  },
  createExperience: async (experience: any) => {
    const response = await axiosInstance.post('/admin/work-experiences', experience);
    return response.data.data;
  },
  updateExperience: async (id: number, experience: any) => {
    const response = await axiosInstance.put(`/admin/work-experiences/${id}`, experience);
    return response.data.data;
  },
  deleteExperience: async (id: number) => {
    await axiosInstance.delete(`/admin/work-experiences/${id}`);
  },
};

export const educationAdminService = {
  getAllEducation: async () => {
    const response = await axiosInstance.get('/admin/education');
    return response.data.data;
  },
  createEducation: async (education: any) => {
    const response = await axiosInstance.post('/admin/education', education);
    return response.data.data;
  },
  updateEducation: async (id: number, education: any) => {
    const response = await axiosInstance.put(`/admin/education/${id}`, education);
    return response.data.data;
  },
  deleteEducation: async (id: number) => {
    await axiosInstance.delete(`/admin/education/${id}`);
  },
};

export const hobbiesAdminService = {
  getAllHobbies: async () => {
    const response = await axiosInstance.get('/admin/hobbies');
    return response.data.data;
  },
  createHobby: async (hobby: any) => {
    const response = await axiosInstance.post('/admin/hobbies', hobby);
    return response.data.data;
  },
  updateHobby: async (id: number, hobby: any) => {
    const response = await axiosInstance.put(`/admin/hobbies/${id}`, hobby);
    return response.data.data;
  },
  deleteHobby: async (id: number) => {
    await axiosInstance.delete(`/admin/hobbies/${id}`);
  },
};

export const contactAdminService = {
  getContactInfo: async () => {
    const response = await axiosInstance.get('/admin/contact/info');
    return response.data.data;
  },
  updateContactInfo: async (contactInfo: any) => {
    const response = await axiosInstance.put('/admin/contact/info', contactInfo);
    return response.data.data;
  },
  getAllMessages: async () => {
    const response = await axiosInstance.get('/admin/contact/messages');
    return response.data.data;
  },
  markMessageAsRead: async (id: number) => {
    const response = await axiosInstance.put(`/admin/contact/messages/${id}/read`);
    return response.data.data;
  },
  deleteMessage: async (id: number) => {
    await axiosInstance.delete(`/admin/contact/messages/${id}`);
  },
};

export const testimonialsAdminService = {
  getAllTestimonials: async () => {
    const response = await axiosInstance.get('/admin/testimonials');
    return response.data.data;
  },
  getPendingTestimonials: async () => {
    const response = await axiosInstance.get('/admin/testimonials/pending');
    return response.data.data;
  },
  approveTestimonial: async (id: number) => {
    const response = await axiosInstance.post(`/admin/testimonials/${id}/approve`);
    return response.data.data;
  },
  rejectTestimonial: async (id: number, reason: string) => {
    const response = await axiosInstance.post(`/admin/testimonials/${id}/reject`, { reason });
    return response.data.data;
  },
  deleteTestimonial: async (id: number) => {
    await axiosInstance.delete(`/admin/testimonials/${id}`);
  },
};

export const resumeAdminService = {
  getActiveResume: async () => {
    const response = await axiosInstance.get('/admin/resume');
    return response.data.data;
  },
  uploadResume: async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    const response = await axiosInstance.post('/admin/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
  activateResume: async (id: number) => {
    const response = await axiosInstance.post(`/admin/resume/${id}/activate`);
    return response.data.data;
  },
  deleteResume: async (id: number) => {
    await axiosInstance.delete(`/admin/resume/${id}`);
  },
};
