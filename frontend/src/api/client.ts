import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

import { tokenStorage } from '../auth/token_storage';

export type ApiErrorResponse = {
  message?: string;
  errors?: Array<{
    message?: string;
    field?: string;
    rule?: string;
  }>;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly data?: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiClient = axios.create({
  baseURL:
    import.meta.env.API_URL ??
    'http://localhost:3333',

  headers: {
    Accept: 'application/json',
  },

  timeout: 10_000,
});

apiClient.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = tokenStorage.get();

    if (token) {
      config.headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          'Could not connect to the API server',
          0
        )
      );
    }

    const data = error.response.data;

    const message =
      data?.message ??
      data?.errors?.[0]?.message ??
      'The request failed';

    return Promise.reject(
      new ApiError(
        message,
        error.response.status,
        data
      )
    );
  }
);