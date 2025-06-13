import axios from 'axios';

const API_URL = 'http://localhost:8080/api/parcels';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getParcels = () => axios.get(API_URL, getAuthHeaders());

export const getParcelByTrackingNumber = (trackingNumber) =>
  axios.get(`${API_URL}/${trackingNumber}`); // Public API — no auth

export const createParcel = (parcel) =>
  axios.post(API_URL, parcel, getAuthHeaders());

export const updateParcel = (id, parcel) =>
  axios.put(`${API_URL}/${id}`, parcel, getAuthHeaders());

export const deleteParcel = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeaders());
