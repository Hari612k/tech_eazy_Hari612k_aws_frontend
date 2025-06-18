import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getRoleFromToken, getToken } from './utils/jwt';
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
  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(null);

  useEffect(() => {
    const currentRole = getRoleFromToken();
    setRole(currentRole);
  }, [token]);

  const handleSuccess = () => {
    setEditingParcel(null);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PublicTrackParcel />} />
          <Route path="/login" element={<Login setToken={setToken} />} />

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

          {role === 'ROLE_VENDOR' && (
            <Route path="/upload" element={<UploadOrder token={token} />} />
          )}

          {(role === 'ROLE_ADMIN' || role === 'ROLE_VENDOR') && (
            <Route path="/orders" element={<OrderList token={token} />} />
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
