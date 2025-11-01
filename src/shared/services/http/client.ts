import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.response.use(
  (r) => r,
  (error) => {
    const normalized = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message,
      data: error.response?.data,
    };
    return Promise.reject(normalized);
  },
);
