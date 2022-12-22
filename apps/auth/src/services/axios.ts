import axios, { AxiosError } from 'axios';
import { createAuthError } from '../app/helpers/authError';

export const authInstance = axios.create({
  baseURL: process.env['NX_API_URL'],
  timeout: 4000,
});

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error.isAxiosError) {
      const errorEvent = new CustomEvent('authError', {
        detail: createAuthError(error),
      });
      window.dispatchEvent(errorEvent);
    }
  }
);
