import React, { useState } from 'react';
import axios from 'axios';

const UploadOrder = () => {
  const [vendorName, setVendorName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('vendorName', vendorName);
    formData.append('orderDate', orderDate);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/api/orders/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('File uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Delivery Order</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Vendor Name" value={vendorName} onChange={e => setVendorName(e.target.value)} required />
        <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} required />
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadOrder;
