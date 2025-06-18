import React, { useState } from 'react';
import axios from 'axios';
import './UploadOrder.css';

const UploadOrder = ({ token }) => {
  const [vendorName, setVendorName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!vendorName || !orderDate || !file) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('vendorName', vendorName);
    formData.append('orderDate', orderDate);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/orders/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(`Success: ${response.data.totalOrders} orders uploaded.`);
    } catch (error) {
      setMessage('Upload failed. ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="container">
      <h2>Upload Delivery Order</h2>
      <div className="form-group">
        <label>Vendor Name:</label>
        <input type="text" value={vendorName} onChange={e => setVendorName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Order Date:</label>
        <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Upload File:</label>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
      </div>
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadOrder;
