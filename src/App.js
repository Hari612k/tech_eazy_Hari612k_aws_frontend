import React, { useState } from 'react';
import Layout from './components/Layout';
import ParcelForm from './components/ParcelForm';
import ParcelGrid from './components/ParcelGrid';
import './styles.css';
const App = () => {
  const [editingParcel, setEditingParcel] = useState(null);

  const handleSuccess = () => {
    setEditingParcel(null);
  };

  return (
    <Layout>
      <div className="container">
        <h2>{editingParcel ? 'Edit Parcel' : 'Create New Parcel'}</h2>
        <ParcelForm parcel={editingParcel} onSuccess={handleSuccess} />
        <ParcelGrid onEdit={setEditingParcel} />
      </div>
    </Layout>
  );
};

export default App;