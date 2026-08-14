import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Target, Map, Calendar, AlignJustify, TrendingUp, Megaphone,
  Briefcase, Layers, PieChart, CheckSquare, Settings, ShieldAlert, LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Executive Overview', path: '/', icon: <BarChart size={18} /> },
      ]
    },
    {
      title: 'STRATEGY',
      items: [
        { name: 'Vision & Mission', path: '/vision-mission', icon: <Target size={18} /> },
        { name: 'Strategic Plan', path: '/strategic-plan', icon: <Map size={18} /> },
        { name: 'Strategic Priorities', path: '/strategic-priorities', icon: <CheckSquare size={18} /> },
      ]
    },
    {
      title: 'TOURS & OPERATIONS',
      items: [
        { name: 'Tour Portfolio', path: '/tours/portfolio', icon: <Layers size={18} /> },
        { name: 'Operations Tour Calendar', path: '/tours/calendar', icon: <Calendar size={18} /> },
        { name: 'Confirmed Tours', path: '/tours/confirmed', icon: <CheckSquare size={18} /> },
        { name: 'Operations Planning', path: '/tours/planning', icon: <Briefcase size={18} /> },
        { name: 'Festivals & Holidays', path: '/tours/festivals', icon: <Map size={18} /> },
      ]
    },
    {
      title: 'DEPARTMENTS',
      items: [
        { name: 'Marketing Strategy', path: '/marketing-strategy', icon: <Megaphone size={18} /> },
        { name: 'Sales Strategy', path: '/sales-strategy', icon: <TrendingUp size={18} /> },
        { name: 'Finance Planning', path: '/finance-planning', icon: <PieChart size={18} /> },
      ]
    },
    {
      title: 'ALIGNMENT',
      items: [
        { name: 'Company Alignment', path: '/alignment-matrix', icon: <AlignJustify size={18} /> },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Admin Center', path: '/admin', icon: <Settings size={18} /> },
        { name: 'Data Quality', path: '/data-quality', icon: <ShieldAlert size={18} /> },
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="Campfly Logo" style={{ height: '36px', marginBottom: '8px' }} />
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Operations Command Center</p>
      </div>
      
      <div className="sidebar-nav" style={{ flex: 1, overflowY: 'auto' }}>
        {navGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              {group.title}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div style={{ flexShrink: 0, padding: '1rem 0', borderTop: '1px solid var(--sidebar-border)', marginTop: 'auto' }}>
        <button 
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ width: '100%', justifyContent: 'flex-start' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
