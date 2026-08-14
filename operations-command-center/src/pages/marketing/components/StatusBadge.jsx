import React from 'react';

const StatusBadge = ({ status, small, colorMap }) => {
  const defaults = {
    'Planning':        { color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
    'Early Promotion': { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'Active':          { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    'In Progress':     { color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
    'In Review':       { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'Post-Promotion':  { color: '#818CF8', bg: 'rgba(129,140,248,0.15)' },
    'Completed':       { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    'Approved':        { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    'Rejected':        { color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
    'Pending':         { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'Draft':           { color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
    'Scheduled':       { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    'To Do':           { color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
    'On Track':        { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    'At Risk':         { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'Behind':          { color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
    'Upcoming':        { color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
    'Missed':          { color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
    'Open':            { color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
    'Mitigated':       { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'Closed':          { color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  };

  const map = { ...defaults, ...colorMap };
  const s = map[status] || { color: '#6B7280', bg: 'rgba(107,114,128,0.15)' };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: small ? '0.15rem 0.5rem' : '0.25rem 0.65rem',
      borderRadius: '20px', fontSize: small ? '0.7rem' : '0.75rem',
      fontWeight: 700, background: s.bg, color: s.color,
      border: `1px solid ${s.color}40`, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {status}
    </span>
  );
};

export default StatusBadge;
