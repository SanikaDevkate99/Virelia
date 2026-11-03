import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export const getPlants = () => api.get('/plants');
export const createPlant = (data) => api.post('/plants', data);
export const deletePlant = (id) => api.delete(`/plants/${id}`);

export const getDiagnoses = () => api.get('/diagnoses');
export const createDiagnosis = (data) => api.post('/diagnoses', data);

export const getEnvironmentalMeasurements = () => api.get('/environment');
export const createEnvironmentalMeasurement = (data) => api.post('/environment', data);

export const getRecommendations = () => api.get('/recommendations');
export const completeRecommendation = (id) => api.patch(`/recommendations/${id}/complete`);

export default api;
