import React from 'react';

const AVATAR_COLORS = [
  '#818CF8', '#10B981', '#F59E0B', '#EC4899',
  '#3B82F6', '#EF4444', '#8B5CF6', '#06B6D4',
];

const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

const OwnerAvatar = ({ name, size = 24, showName = true }) => {
  const color = getColor(name);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <span style={{
        width: size, height: size, borderRadius: '50%',
        background: `${color}25`, color, border: `1.5px solid ${color}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.42, fontWeight: 700, flexShrink: 0,
        lineHeight: 1,
      }}>
        {getInitials(name)}
      </span>
      {showName && <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{name}</span>}
    </span>
  );
};

export default OwnerAvatar;
