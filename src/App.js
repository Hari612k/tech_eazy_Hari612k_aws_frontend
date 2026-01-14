import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ParcelForm from './components/ParcelForm';
import ParcelGrid from './components/ParcelGrid';
import Login from './components/Login';
import UploadOrder from './components/UploadOrder';
import OrderList from './components/OrderList';
import './styles.css';

const App = () => {
  const [editingParcel, setEditingParcel] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSuccess = () => {
    setEditingParcel(null);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="container">
              <h2>{editingParcel ? 'Edit Parcel' : 'Create New Parcel'}</h2>
              <ParcelForm parcel={editingParcel} onSuccess={handleSuccess} />
              <ParcelGrid onEdit={setEditingParcel} />
            </div>
          } />

          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/upload" element={<UploadOrder />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;