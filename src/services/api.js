import axios from 'axios';

const API_URL = 'http://localhost:8080/api/parcels';

export const getParcels = () => axios.get(API_URL);
export const getParcelByTrackingNumber = (trackingNumber) => axios.get(`${API_URL}/${trackingNumber}`);
export const createParcel = (parcel) => axios.post(API_URL, parcel);
export const updateParcel = (id, parcel) => axios.put(`${API_URL}/${id}`, parcel);
export const deleteParcel = (id) => axios.delete(`${API_URL}/${id}`);