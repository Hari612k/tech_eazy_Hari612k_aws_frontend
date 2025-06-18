import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/jwt';

const ParcelGrid = ({ onEdit }) => {
  const [parcels, setParcels] = useState([]);

  const fetchParcels = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/parcels', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setParcels(res.data);
    } catch (err) {
      console.error('Error fetching parcels:', err);
    }
  };

  const deleteParcel = async (id) => {
    if (window.confirm('Are you sure you want to delete this parcel?')) {
      try {
        await axios.delete(`http://localhost:8080/api/parcels/delete/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchParcels();
      } catch (err) {
        console.error('Error deleting parcel:', err);
      }
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="grid-container">
      <h3>All Parcels</h3>
      <table>
        <thead>
          <tr>
            <th>Tracking #</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel.id}>
              <td>{parcel.trackingNumber}</td>
              <td>{parcel.customerName}</td>
              <td>{parcel.deliveryAddress}</td>
              <td>{parcel.contactNumber}</td>
              <td>{parcel.parcelSize}</td>
              <td>{parcel.parcelWeight} kg</td>
              <td>
                <button onClick={() => onEdit(parcel)}>Edit</button>
                <button onClick={() => deleteParcel(parcel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelGrid;
