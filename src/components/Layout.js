import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Parcel Tracking System</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 TCTECHNARY</p>
      </footer>
    </div>
  );
};

export default Layout;