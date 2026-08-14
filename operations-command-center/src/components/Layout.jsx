import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import LockedModuleView from './LockedModuleView';
import { useAuth } from '../context/AuthContext';
import { canAccessRoute } from '../utils/rbac';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const hasAccess = canAccessRoute(user?.role || 'ADMIN', location.pathname);

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header />
        <div className="main-content" style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-dark, #0B1120)' }}>
          <div className="page-container" style={{ minHeight: '100%' }}>
            {hasAccess ? children : <LockedModuleView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
