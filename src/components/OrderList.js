import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/jwt';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const params = { vendorName, date, page, size };
      const token = getToken();
      const response = await axios.get('http://localhost:8080/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setOrders(response.data.content || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, size]);

  const handleFilter = () => {
    fetchOrders();
  };

  return (
    <div className="container">
      <h2>Delivery Orders</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Vendor Name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Vendor Name</th>
            <th>Total Parcels</th>
            <th>File Link</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderDate}</td>
              <td>{order.vendorName}</td>
              <td>{order.totalOrders}</td>
              <td>
                <a href={`http://localhost:8080/${order.fileLink}`} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default OrderList;
