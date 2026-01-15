import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ParcelSummary = () => {
  const token = localStorage.getItem('token');
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8080/api/summary/today', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSummary(res.data))
    .catch(() => alert("Failed to load summary"));
  }, [token]);

  return (
    <div>
      <h2>Today's Parcel Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Delivery Address</th>
            <th>Parcels Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([address, count]) => (
            <tr key={address}>
              <td>{address}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelSummary;
