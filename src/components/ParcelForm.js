import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParcelForm = ({ parcel, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryAddress: '',
    contactNumber: '',
    parcelSize: '',
    parcelWeight: '',
    trackingNumber: ''
  });

  useEffect(() => {
    if (parcel) {
      setFormData(parcel);
    }
  }, [parcel]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (parcel) {
        await axios.put(`/api/parcels/update/${parcel.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/parcels', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({
        customerName: '', deliveryAddress: '', contactNumber: '',
        parcelSize: '', parcelWeight: '', trackingNumber: ''
      });
      onSuccess();
    } catch (error) {
      console.error('Error saving parcel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" required />
      <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} placeholder="Delivery Address" required />
      <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
      <input type="text" name="parcelSize" value={formData.parcelSize} onChange={handleChange} placeholder="Parcel Size" required />
      <input type="number" name="parcelWeight" value={formData.parcelWeight} onChange={handleChange} placeholder="Parcel Weight" required />
      <input type="text" name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} placeholder="Tracking Number" required />
      <button type="submit">{parcel ? 'Update' : 'Create'} Parcel</button>
    </form>
  );
};

export default ParcelForm;
