import React from 'react';
import { Search } from 'lucide-react';

const inputStyle = {
  boxSizing: 'border-box',
  padding: '0.55rem 0.75rem',
  background: 'var(--bg-secondary, #1e293b)',
  border: '1px solid var(--border-color, #334155)',
  borderRadius: '8px',
  color: 'var(--text-primary, #f8fafc)',
  fontSize: '0.85rem',
  outline: 'none',
};

const FilterBar = ({ searchValue, onSearchChange, searchPlaceholder = 'Search...', filters = [], children }) => (
  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', gap: '0.75rem', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
      {onSearchChange && (
        <div style={{ position: 'relative', minWidth: '200px', flex: 1, maxWidth: '320px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            id="filter-search"
            aria-label="Search"
            style={{ ...inputStyle, width: '100%', paddingLeft: '2.2rem' }}
            placeholder={searchPlaceholder}
            value={searchValue || ''}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      )}
      {filters.map(f => (
        <select
          key={f.id}
          id={f.id}
          aria-label={f.label}
          style={{ ...inputStyle, width: 'auto' }}
          value={f.value}
          onChange={e => f.onChange(e.target.value)}
        >
          <option value="ALL">{f.allLabel || `All ${f.label}`}</option>
          {f.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
    {children && <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>{children}</div>}
  </div>
);

export { inputStyle };
export default FilterBar;
