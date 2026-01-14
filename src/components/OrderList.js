import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:8080/api/orders', {
          params: { vendorName, date },
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.content || []);
      } catch (err) {
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, [vendorName, date]);

  return (
    <div>
      <h2>Delivery Orders</h2>
      <input type="text" placeholder="Vendor Name" onChange={e => setVendorName(e.target.value)} />
      <input type="date" onChange={e => setDate(e.target.value)} />
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.vendorName} - {order.totalOrders} orders on {order.orderDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;