import React from 'react';
import { Lock, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES, getLockedReason } from '../utils/rbac';
import { useLocation, useNavigate } from 'react-router-dom';

const LockedModuleView = () => {
  const { user, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const reason = getLockedReason(user?.role || 'ADMIN', location.pathname);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        padding: '2.5rem',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.1)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: '#EF4444'
        }}>
          <Lock size={32} />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem' }}>
          Module Access Restricted
        </h2>
        <div style={{
          display: 'inline-block',
          padding: '0.2rem 0.75rem',
          borderRadius: '20px',
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#F87171',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1.25rem'
        }}>
          Role Lock Enforced ({ROLES[user?.role]?.name || user?.role})
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
          {reason?.message || `You do not have write or view permissions for this department's internal workspace.`}
        </p>

        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.75rem',
          textAlign: 'left',
          fontSize: '0.82rem'
        }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: '4px' }}>Authorized Departments:</div>
          <div style={{ fontWeight: 600, color: '#60A5FA' }}>{reason?.allowedRoles || 'Admin Only'}</div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} /> Return to Overview
          </button>
          
          <button
            onClick={() => switchRole('ADMIN')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={16} /> Switch to Admin Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockedModuleView;
