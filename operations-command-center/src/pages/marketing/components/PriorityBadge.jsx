import React from 'react';

const PRIORITY_META = {
  High:   { color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  Medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  Low:    { color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  Critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.12)' },
};

const PriorityBadge = ({ priority }) => {
  const p = PRIORITY_META[priority] || PRIORITY_META.Medium;
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 700,
      padding: '0.15rem 0.5rem', borderRadius: '4px',
      background: p.bg, color: p.color,
      border: `1px solid ${p.color}30`,
    }}>
      {priority}
    </span>
  );
};

export { PRIORITY_META };
export default PriorityBadge;
