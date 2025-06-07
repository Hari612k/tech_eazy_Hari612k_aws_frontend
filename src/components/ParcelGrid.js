import React, { useState, useEffect } from 'react';
import { getParcels, deleteParcel } from '../services/api';

const ParcelGrid = ({ onEdit }) => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await getParcels();
      setParcels(response.data);
    } catch (error) {
      console.error('Error fetching parcels:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteParcel(id);
      fetchParcels();
    } catch (error) {
      console.error('Error deleting parcel:', error);
    }
  };

  return (
    <div>
      <h2>Parcel List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Tracking Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.id}>
              <td>{parcel.customerName}</td>
              <td>{parcel.deliveryAddress}</td>
              <td>{parcel.trackingNumber}</td>
              <td>
                <button onClick={() => onEdit(parcel)}>Edit</button>
                <button onClick={() => handleDelete(parcel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelGrid;