// src/components/PublicTrackParcel.js
import React, { useState } from 'react';
import axios from 'axios';

const PublicTrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/public/parcel/${trackingNumber}`);
      setParcel(res.data.data);
      setError('');
    } catch (err) {
      setParcel(null);
      setError('Parcel not found.');
    }
  };

  return (
    <div className="container">
      <h2>Track Parcel</h2>
      <input
        type="text"
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleTrack}>Track</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {parcel && (
        <div className="parcel-details">
          <p><strong>Customer:</strong> {parcel.customerName}</p>
          <p><strong>Address:</strong> {parcel.deliveryAddress}</p>
          <p><strong>Contact:</strong> {parcel.contactNumber}</p>
          <p><strong>Size:</strong> {parcel.parcelSize}</p>
          <p><strong>Weight:</strong> {parcel.parcelWeight}</p>
        </div>
      )}
    </div>
  );
};

export default PublicTrackParcel;
