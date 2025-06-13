import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Zero Mile Delivery System</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 Techeazy Internship</p>
      </footer>
    </div>
  );
};

export default Layout;
