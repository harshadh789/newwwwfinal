import React from 'react';

const QuickStatCard = ({ icon: Icon, label, value, sub, color = 'var(--primary-color)', accent }) => (
  <div style={{
    background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px',
    padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
    borderTop: `3px solid ${color}`, transition: 'transform 0.2s',
  }}>
    <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={20} color={color} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: accent || 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>{sub}</div>}
    </div>
  </div>
);

export default QuickStatCard;
