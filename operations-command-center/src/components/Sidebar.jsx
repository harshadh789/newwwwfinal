import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canAccessRoute, ROLES } from '../utils/rbac';
import { 
  BarChart, Target, Map, Calendar, AlignJustify, TrendingUp, Megaphone,
  Briefcase, Layers, PieChart, CheckSquare, Settings, ShieldAlert, LogOut,
  Lock, Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userRole = user?.role || 'ADMIN';

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Executive Overview', path: '/', icon: <BarChart size={17} /> },
      ]
    },
    {
      title: 'STRATEGY',
      items: [
        { name: 'Vision & Mission', path: '/vision-mission', icon: <Target size={17} /> },
        { name: 'Strategic Plan', path: '/strategic-plan', icon: <Map size={17} /> },
        { name: 'Strategic Priorities', path: '/strategic-priorities', icon: <CheckSquare size={17} /> },
      ]
    },
    {
      title: 'TOURS & OPERATIONS',
      items: [
        { name: 'Tour Catalogue', path: '/tours/portfolio', icon: <Layers size={17} /> },
        { name: 'Operations Tour Calendar', path: '/tours/calendar', icon: <Calendar size={17} /> },
        { name: 'Confirmed Tours', path: '/tours/confirmed', icon: <CheckSquare size={17} /> },
        { name: 'Operations Planning', path: '/tours/planning', icon: <Briefcase size={17} /> },
        { name: 'Festival & Holiday Calendar+', path: '/tours/festivals', icon: <Map size={17} /> },
      ]
    },
    {
      title: 'DEPARTMENTS',
      items: [
        { name: 'Marketing Strategy', path: '/marketing-strategy', icon: <Megaphone size={17} /> },
        { name: 'Sales Strategy', path: '/sales-strategy', icon: <TrendingUp size={17} /> },
        { name: 'Finance Module', path: '/finance-planning', icon: <PieChart size={17} /> },
      ]
    },
    {
      title: 'ALIGNMENT',
      items: [
        { name: 'Company Alignment', path: '/alignment-matrix', icon: <AlignJustify size={17} /> },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Admin Center', path: '/admin', icon: <Settings size={17} /> },
        { name: 'Data Quality', path: '/data-quality', icon: <ShieldAlert size={17} /> },
      ]
    }
  ];

  return (
    <div className="sidebar" style={{
      width: '260px',
      height: '100vh',
      background: 'rgba(10, 15, 29, 0.95)',
      borderRight: '1px solid var(--sidebar-border, rgba(255,255,255,0.08))',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }}>
      {/* Sidebar Header */}
      <div className="sidebar-header" style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <img src="/logo.png" alt="Campfly Logo" style={{ height: '32px' }} />
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#60A5FA',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '1px 6px',
            borderRadius: '4px'
          }}>
            v3.0
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
          Operations Command Center
        </p>
      </div>
      
      {/* Navigation list */}
      <div className="sidebar-nav" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {navGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: '1.25rem' }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: 'var(--text-tertiary)',
              marginBottom: '0.4rem',
              letterSpacing: '0.06em',
              paddingLeft: '0.5rem'
            }}>
              {group.title}
            </div>
            {group.items.map((item) => {
              const accessible = canAccessRoute(userRole, item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: accessible ? 1 : 0.65,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    marginBottom: '2px',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {!accessible && (
                    <span title="Module locked for your current role" style={{ display: 'flex', alignItems: 'center', color: '#EF4444' }}>
                      <Lock size={13} />
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer User & Logout */}
      <div style={{ flexShrink: 0, padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        <button 
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ width: '100%', justifyContent: 'center', padding: '0.45rem 1rem', fontSize: '0.8rem', gap: '6px' }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
