import React from 'react';

const ProgressBar = ({ value = 0, max = 100, color = '#10B981', height = 8, showLabel = true, label }) => {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const barColor = pct >= 80 ? '#10B981' : pct >= 50 ? '#F59E0B' : pct >= 25 ? '#3B82F6' : '#6B7280';
  const finalColor = color !== '#10B981' ? color : barColor;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
      <div style={{
        flex: 1, height, borderRadius: height, background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: height,
          background: finalColor, transition: 'width 0.4s ease',
        }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: finalColor, minWidth: '2.5rem', textAlign: 'right' }}>
          {label || `${pct}%`}
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
