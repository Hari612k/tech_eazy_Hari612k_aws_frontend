import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [date, setDate] = useState('');
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          vendorName: vendorName || undefined,
          date: date || undefined
        }
      });
      setOrders(res.data.content || []);
    } catch (err) {
      alert('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="Vendor Name" value={vendorName} onChange={e => setVendorName(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={fetchOrders}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Date</th>
            <th>File Link</th>
            <th>Parcel Count</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order.vendorName}</td>
              <td>{order.orderDate}</td>
              <td>{order.fileLink}</td>
              <td>{order.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
