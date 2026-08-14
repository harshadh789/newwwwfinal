import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
