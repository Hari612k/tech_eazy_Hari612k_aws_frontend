import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Layout from './components/Layout';
import ParcelForm from './components/ParcelForm';
import ParcelGrid from './components/ParcelGrid';
import Login from './components/Login';
import UploadOrder from './components/UploadOrder';
import OrderList from './components/OrderList';
import PublicTrackParcel from './components/PublicTrackParcel';
import ParcelSummary from './components/ParcelSummary';
import './styles.css';

const App = () => {
  const [editingParcel, setEditingParcel] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const authorities = decoded?.authorities || decoded?.role || [];
        const userRole = Array.isArray(authorities) ? authorities[0] : authorities;
        setRole(userRole);
      } catch (err) {
        console.error('Invalid token:', err);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const handleSuccess = () => {
    setEditingParcel(null);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<PublicTrackParcel />} />

          {/* Login route */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          {/* Protected: Admin only */}
          {role === 'ROLE_ADMIN' && (
            <>
              <Route path="/admin" element={
                <div className="container">
                  <h2>{editingParcel ? 'Edit Parcel' : 'Create New Parcel'}</h2>
                  <ParcelForm parcel={editingParcel} onSuccess={handleSuccess} />
                  <ParcelGrid onEdit={setEditingParcel} />
                </div>
              } />
              <Route path="/summary" element={<ParcelSummary />} />
            </>
          )}

          {/* Protected: Vendor only */}
          {role === 'ROLE_VENDOR' && (
            <Route path="/upload" element={<UploadOrder token={token} />} />
          )}

          {/* Shared (Admin or Vendor) */}
          {(role === 'ROLE_VENDOR' || role === 'ROLE_ADMIN') && (
            <Route path="/orders" element={<OrderList token={token} />} />
          )}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
