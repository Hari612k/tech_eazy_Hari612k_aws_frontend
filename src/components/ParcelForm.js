import React, { useState } from 'react';
import { createParcel, updateParcel } from '../services/api';

const ParcelForm = ({ parcel, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: parcel?.customerName || '',
    deliveryAddress: parcel?.deliveryAddress || '',
    contactNumber: parcel?.contactNumber || '',
    parcelSize: parcel?.parcelSize || '',
    parcelWeight: parcel?.parcelWeight || 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (parcel) {
        await updateParcel(parcel.id, formData);
      } else {
        await createParcel(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving parcel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Delivery Address:</label>
        <input
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Parcel Size:</label>
        <input
          type="text"
          name="parcelSize"
          value={formData.parcelSize}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Parcel Weight (kg):</label>
        <input
          type="number"
          name="parcelWeight"
          value={formData.parcelWeight}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{parcel ? 'Update' : 'Create'} Parcel</button>
    </form>
  );
};

export default ParcelForm;