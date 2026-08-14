import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Target } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import ProgressBar from '../marketing/components/ProgressBar';
import OwnerAvatar from '../marketing/components/OwnerAvatar';
import FilterBar from '../marketing/components/FilterBar';
import Modal from '../marketing/components/Modal';
import { SALES_TEAM, TARGET_TYPES, TARGET_STATUS, formatINR, inputStyle, lbl } from './constants';
import { MONTH_FULL } from '../marketing/constants';

const SalesTargets = ({ targets, tours, isAdmin, loadData }) => {
  const [repFilter, setRepFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  
  const [form, setForm] = useState({ rep: SALES_TEAM[0], tourId: '', type: TARGET_TYPES[0], target: 0, achieved: 0, month: MONTH_FULL[new Date().getMonth()], status: TARGET_STATUS[0] });

  const filtered = targets.filter(t => repFilter === 'ALL' || t.rep === repFilter);

  const openAdd = () => { setEditing(null); setForm({ rep: SALES_TEAM[0], tourId: tours[0]?.id || '', type: TARGET_TYPES[0], target: 0, achieved: 0, month: MONTH_FULL[new Date().getMonth()], status: TARGET_STATUS[0] }); setShowModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ ...t }); setShowModal(true); };
  const handleDelete = async (id) => { if (window.confirm('Delete this target?')) { await dataService.deleteSalesTarget(id); loadData(); } };
  const handleSave = async (e) => { e.preventDefault(); await dataService.saveSalesTarget(editing ? { ...form, id: editing.id } : form); setShowModal(false); loadData(); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <FilterBar
        filters={[
          { id: 'st-rep', label: 'Sales Rep', value: repFilter, onChange: setRepFilter, options: SALES_TEAM.map(r => ({ value: r, label: r })) },
        ]}
      >
        {isAdmin && <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Add Target</button>}
      </FilterBar>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No targets match filters.</div>}
        {filtered.map(t => {
          const tour = tours.find(tr => tr.id === t.tourId);
          const isRev = t.type === 'Revenue';
          const pct = t.target > 0 ? (t.achieved / t.target) * 100 : 0;
          return (
            <div key={t.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <OwnerAvatar name={t.rep} size={32} showName={false} />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.rep}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{t.month} • {tour?.name || 'All Tours'}</div>
                  </div>
                </div>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button onClick={() => openEdit(t)} aria-label="Edit target" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={13} /></button>
                    <button onClick={() => handleDelete(t.id)} aria-label="Delete target" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>{t.type} Target</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {isRev ? formatINR(t.achieved) : t.achieved} <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>/ {isRev ? formatINR(t.target) : t.target}</span>
                  </div>
                </div>
                <ProgressBar value={t.achieved} max={t.target} color={pct >= 100 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#3B82F6'} label={`${Math.round(pct)}% Achieved`} />
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title={editing ? 'Edit Target' : 'Add Target'} onClose={() => setShowModal(false)} width="400px">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div><label htmlFor="st-rep" style={lbl}>Sales Rep *</label><select id="st-rep" style={inputStyle} value={form.rep} onChange={e => setForm(p => ({ ...p, rep: e.target.value }))} required>{SALES_TEAM.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
            <div><label htmlFor="st-tour" style={lbl}>Tour (Optional)</label><select id="st-tour" style={inputStyle} value={form.tourId} onChange={e => setForm(p => ({ ...p, tourId: e.target.value }))}><option value="">All Tours / General</option>{tours.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="st-type" style={lbl}>Type</label><select id="st-type" style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>{TARGET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label htmlFor="st-month" style={lbl}>Month</label><select id="st-month" style={inputStyle} value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))}>{MONTH_FULL.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="st-target" style={lbl}>Target</label><input id="st-target" type="number" style={inputStyle} value={form.target} onChange={e => setForm(p => ({ ...p, target: Number(e.target.value) }))} required /></div>
              <div><label htmlFor="st-achieved" style={lbl}>Achieved</label><input id="st-achieved" type="number" style={inputStyle} value={form.achieved} onChange={e => setForm(p => ({ ...p, achieved: Number(e.target.value) }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Target</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SalesTargets;
