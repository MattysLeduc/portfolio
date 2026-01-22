import apiClient from './axiosInstance';

interface LoginResponse {
  token: string;
  username: string;
  roles?: Array<{ authority: string }>;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', { username, password });
    return response.data;
  },
};
