import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const ParcelSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('/api/summary/today', {
          headers: getAuthHeader()
        });
        setSummary(res.data);
      } catch (err) {
        alert('Failed to load summary');
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="grid-container">
      <h3>Today’s Parcel Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Delivery Address</th>
            <th>Parcel Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([address, count], i) => (
            <tr key={i}>
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
