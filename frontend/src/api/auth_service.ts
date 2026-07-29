import { apiClient } from './client';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  passwordConfirmation: string;
};

const AUTH_ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
};

export const authService = {
  async register(
    credentials: RegisterCredentials
  ): Promise<void> {
    await apiClient.post<void>(
      AUTH_ENDPOINTS.register,
      credentials
    );
  },

  async login(
    credentials: AuthCredentials
  ): Promise<string> {
    const response = await apiClient.post<{ data: { token: string; }; }>(
      AUTH_ENDPOINTS.login,
      credentials
    );

    return response.data.data.token;
  },

  async logout(): Promise<void> {
    await apiClient.delete(
      AUTH_ENDPOINTS.logout
    );
  },
};