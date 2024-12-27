import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7178/api',
  headers: { 'Content-Type': 'application/json' }, // Cabeçalho configurado globalmente
});

export const getBusinessPartners = async (page = 1, pageSize = 10, filter = "") => {
  try {
    const response = await api.get("/BusinessPartner", {
      params: { page, pageSize, filter },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar business partners", error);
    throw error;
  }
};

export const createBusinessPartner = (data) => api.post('/BusinessPartner', data);
export const updateBusinessPartner = (id, cardName) => api.patch(`/BusinessPartner/${id}`, cardName);
export const deleteBusinessPartner = (id) => api.delete(`/BusinessPartner/${id}`);

export default api;




