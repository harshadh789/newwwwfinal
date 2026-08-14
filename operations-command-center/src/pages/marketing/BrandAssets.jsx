import React, { useState } from 'react';
import { Image, Video, FileText, Link, Plus, ExternalLink, Download } from 'lucide-react';
import FilterBar from './components/FilterBar';

const ASSET_TYPES = ['Logo', 'Brand Guideline', 'Image', 'Video', 'Template', 'Font', 'Other'];

const BrandAssets = ({ assets }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filtered = assets.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'ALL' && a.type !== typeFilter) return false;
    return true;
  });

  const getIcon = (type) => {
    if (type === 'Image' || type === 'Logo') return <Image size={24} color="#818CF8" />;
    if (type === 'Video') return <Video size={24} color="#F59E0B" />;
    if (type === 'Template' || type === 'Brand Guideline') return <FileText size={24} color="#10B981" />;
    return <Link size={24} color="#6B7280" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search assets..."
        filters={[
          { id: 'ba-type', label: 'Type', value: typeFilter, onChange: setTypeFilter, options: ASSET_TYPES.map(t => ({ value: t, label: t })) },
        ]}
      >
        <button className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Add Asset</button>
      </FilterBar>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No assets match filters.</div>}
        {filtered.map(a => (
          <div key={a.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', transition: 'transform 0.2s, borderColor 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-color)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
            <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getIcon(a.type)}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.2rem' }}>{a.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.type}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}><ExternalLink size={12} /> View</button>
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}><Download size={12} /> DL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandAssets;
