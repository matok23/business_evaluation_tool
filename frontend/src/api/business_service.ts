import { apiClient } from './client';
import type {
  Business,
  UpdateBusinessPayload,
  CreateBusinessPayload
} from '../contracts/business';

export const businessService = {
  async getAll(): Promise<Business[]> {
    const response =
      await apiClient.get<{ data: Business[]; }>('/business');

    return response.data.data;
  },

  async getById(id: number): Promise<Business> {
    const response = await apiClient.get<Business>(
      `/business/${id}`
    );

    return response.data;
  },

  async create(
    payload: CreateBusinessPayload
  ): Promise<Business> {
    const response = await apiClient.post<Business>(
      '/business/create',
      payload
    );

    return response.data;
  },

  async update(
    id: number,
    payload: UpdateBusinessPayload
  ): Promise<Business> {
    const response = await apiClient.patch<Business>(
      `/business/${id}/update`,
      payload
    );

    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.get(`/business/${id}/delete`);
  },

  async reevaluate(id: number): Promise<Business> {
    const response = await apiClient.get<Business>(
      `/business/${id}/evaluate`
    );

    return response.data;
  },
};