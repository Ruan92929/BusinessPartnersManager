import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7178/api',
});

export const getBusinessPartners = (page = 1, pageSize = 5, filter = '') => {
  return api.get('/BusinessPartner', {
    params: { page, pageSize, filter },
  });
};

export const createBusinessPartner = (data) => api.post('/BusinessPartner', data);
export const updateBusinessPartner = (id, data) => api.put(`/BusinessPartner/${id}`, data);
export const deleteBusinessPartner = (id) => api.delete(`/BusinessPartner/${id}`);

export default api;
