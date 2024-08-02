import axios from 'axios';


const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000',
  timeout: 6000,
});

export const searchUsers = async (email: string, number?: string) => {
  const params = new URLSearchParams();
  params.append('email', email);
  if (number) params.append('number', number);
  const response = await api.get('/search', { params });
  return response.data;
};