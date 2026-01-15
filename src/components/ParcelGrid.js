import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParcelGrid = ({ onEdit }) => {
  const [parcels, setParcels] = useState([]);
  const token = localStorage.getItem('token');

  const fetchParcels = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/parcels', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setParcels(res.data);
    } catch (err) {
      alert('Error fetching parcels');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/parcels/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchParcels();
    } catch (err) {
      alert('Error deleting parcel');
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div>
      <h2>Parcel List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Tracking #</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(parcel => (
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
