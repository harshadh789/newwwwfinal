import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Calendar, CheckSquare, Briefcase, Map, TrendingUp } from 'lucide-react';

const ToursLayout = ({ children, title, subtitle }) => {
  return (
    <div>
      <header className="page-header">
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            TOURS & OPERATIONS SYSTEM
          </div>
          <h1>{title}</h1>
          {subtitle && <p className="text-secondary" style={{ marginTop: '0.5rem' }}>{subtitle}</p>}
        </div>
      </header>

      <div style={{ 
        display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem',
        overflowX: 'auto', paddingBottom: '2px'
      }}>

        <NavLink to="/tours/calendar" style={({isActive}) => ({
          padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
          fontWeight: isActive ? 600 : 500, textDecoration: 'none', whiteSpace: 'nowrap'
        })}>
          <Calendar size={18} /> Operations Calendar
        </NavLink>
        <NavLink to="/tours/scheduled" style={({isActive}) => ({
          padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
          fontWeight: isActive ? 600 : 500, textDecoration: 'none', whiteSpace: 'nowrap'
        })}>
          <CheckSquare size={18} /> Scheduled Tours
        </NavLink>
        <NavLink to="/tours/planning" style={({isActive}) => ({
          padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
          fontWeight: isActive ? 600 : 500, textDecoration: 'none', whiteSpace: 'nowrap'
        })}>
          <Briefcase size={18} /> Operations Planning
        </NavLink>
        <NavLink to="/tours/festivals" style={({isActive}) => ({
          padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
          fontWeight: isActive ? 600 : 500, textDecoration: 'none', whiteSpace: 'nowrap'
        })}>
          <Map size={18} /> Festivals & Holidays
        </NavLink>
        <NavLink to="/tours/performance" style={({isActive}) => ({
          padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
          fontWeight: isActive ? 600 : 500, textDecoration: 'none', whiteSpace: 'nowrap'
        })}>
          <TrendingUp size={18} /> Sales Performance
        </NavLink>
      </div>

      <div className="tab-content">
        {children}
      </div>
    </div>
  );
};

export default ToursLayout;
