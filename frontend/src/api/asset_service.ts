import { apiClient } from './client';
import type { Industry } from '../contracts/business';

export const industryService = {
  async getAll(): Promise<Industry[]> {
    const response =
      await apiClient.get<{ data: Industry[]; }>('/assets/industries');

    return response.data.data;
  },
};