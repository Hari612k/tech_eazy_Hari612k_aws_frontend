import React, { useState } from 'react';
import axios from 'axios';

const UploadOrder = () => {
  const [file, setFile] = useState(null);
  const [vendorName, setVendorName] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('vendorName', vendorName);
    formData.append('orderDate', orderDate);
    formData.append('file', file);
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/api/orders/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order uploaded successfully');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Order File</h2>
      <input type="text" placeholder="Vendor Name" onChange={e => setVendorName(e.target.value)} />
      <input type="date" onChange={e => setOrderDate(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadOrder;
