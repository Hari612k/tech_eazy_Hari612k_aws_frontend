import React, { useState } from 'react';
import axios from 'axios';

const ParcelForm = ({ parcel, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: parcel?.customerName || '',
    deliveryAddress: parcel?.deliveryAddress || '',
    contactNumber: parcel?.contactNumber || '',
    parcelSize: parcel?.parcelSize || '',
    parcelWeight: parcel?.parcelWeight || ''
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (parcel) {
        await axios.put(`http://localhost:8080/api/parcels/${parcel.id}`, formData, config);
      } else {
        await axios.post('http://localhost:8080/api/parcels', formData, config);
      }
      onSuccess();
    } catch (err) {
      alert('Error saving parcel');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" required />
      <input name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} placeholder="Delivery Address" required />
      <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
      <input name="parcelSize" value={formData.parcelSize} onChange={handleChange} placeholder="Parcel Size" required />
      <input type="number" name="parcelWeight" value={formData.parcelWeight} onChange={handleChange} placeholder="Weight (kg)" required />
      <button type="submit">{parcel ? 'Update' : 'Create'} Parcel</button>
    </form>
  );
};

export default ParcelForm;
