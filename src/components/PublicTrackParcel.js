import React, { useState } from 'react';
import axios from 'axios';

const PublicTrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`/public/parcels/${trackingNumber}`);
      setParcel(response.data);
    } catch (err) {
      setError('Parcel not found');
      setParcel(null);
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
        className="input"
      />
      <button onClick={handleSearch} className="btn">Track</button>

      {error && <p className="error">{error}</p>}

      {parcel && (
        <div className="card">
          <p><strong>Name:</strong> {parcel.customerName}</p>
          <p><strong>Address:</strong> {parcel.deliveryAddress}</p>
          <p><strong>Contact:</strong> {parcel.contactNumber}</p>
          <p><strong>Size:</strong> {parcel.parcelSize}</p>
          <p><strong>Weight:</strong> {parcel.parcelWeight}</p>
          <p><strong>Tracking:</strong> {parcel.trackingNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PublicTrackParcel;
