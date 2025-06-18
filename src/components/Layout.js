import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, role, onLogout }) => {
  return (
    <div>
      <header className="navbar">
        <h2 className="logo">Zero Mile Delivery</h2>
        <nav className="nav-links">
          <Link to="/">Track Parcel</Link>
          {!role && <Link to="/login">Login</Link>}

          {role === 'ROLE_ADMIN' && (
            <>
              <Link to="/admin">Manage Parcels</Link>
              <Link to="/summary">Summary</Link>
            </>
          )}

          {role === 'ROLE_VENDOR' && <Link to="/upload">Upload Orders</Link>}

          {(role === 'ROLE_ADMIN' || role === 'ROLE_VENDOR') && <Link to="/orders">Orders</Link>}

          {role && <button onClick={onLogout}>Logout</button>}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
