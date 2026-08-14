import React, { useState } from 'react';
import { Target, Plus, Edit3, Trash2, Link } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import StatusBadge from './components/StatusBadge';
import OwnerAvatar from './components/OwnerAvatar';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import { TEAM_MEMBERS, inputStyle, lbl } from './constants';

const GOAL_TYPES = ['Goal', 'OKR', 'KPI'];
const STATUS_OPTIONS = ['On Track', 'At Risk', 'Behind'];

const GoalsAndOKRs = ({ goals, campaigns, isAdmin, loadData }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', type: 'Goal', owner: TEAM_MEMBERS[0], targetValue: 100, currentValue: 0, unit: '', period: 'Monthly', linkedCampaignIds: [], status: 'On Track' });

  const filtered = goals.filter(g => {
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'ALL' && g.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && g.status !== statusFilter) return false;
    return true;
  });

  const openAdd = () => { setEditing(null); setForm({ title: '', type: 'Goal', owner: TEAM_MEMBERS[0], targetValue: 100, currentValue: 0, unit: '', period: 'Monthly', linkedCampaignIds: [], status: 'On Track' }); setShowModal(true); };
  const openEdit = (g) => { setEditing(g); setForm({ ...g }); setShowModal(true); };
  const handleDelete = async (id, title) => { if (window.confirm(`Delete goal "${title}"?`)) { await dataService.deleteMarketingGoal(id); loadData(); } };
  const handleSave = async (e) => { e.preventDefault(); await dataService.saveMarketingGoal(editing ? { ...form, id: editing.id } : form); setShowModal(false); loadData(); };
  const toggleLinkedCampaign = (cId) => { const curr = form.linkedCampaignIds || []; setForm(p => ({ ...p, linkedCampaignIds: curr.includes(cId) ? curr.filter(c => c !== cId) : [...curr, cId] })); };

  const onTrack = goals.filter(g => g.status === 'On Track').length;
  const atRisk = goals.filter(g => g.status === 'At Risk').length;
  const behind = goals.filter(g => g.status === 'Behind').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Summary */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[{ label: 'On Track', count: onTrack, color: '#10B981' }, { label: 'At Risk', count: atRisk, color: '#F59E0B' }, { label: 'Behind', count: behind, color: '#EF4444' }].map(s => (
          <div key={s.label} style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', background: `${s.color}12`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{s.count}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search goals..."
        filters={[
          { id: 'goal-type', label: 'Type', value: typeFilter, onChange: setTypeFilter, options: GOAL_TYPES.map(t => ({ value: t, label: t })) },
          { id: 'goal-status', label: 'Status', value: statusFilter, onChange: setStatusFilter, options: STATUS_OPTIONS.map(s => ({ value: s, label: s })) },
        ]}
      >
        {isAdmin && <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Add Goal</button>}
      </FilterBar>

      {/* Goal list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>No goals match the current filters.</div>}
        {filtered.map(g => {
          const pct = g.targetValue > 0 ? Math.round((g.currentValue / g.targetValue) * 100) : 0;
          const statusColor = g.status === 'On Track' ? '#10B981' : g.status === 'At Risk' ? '#F59E0B' : '#EF4444';
          const linkedCamps = campaigns.filter(c => (g.linkedCampaignIds || []).includes(c.id));
          return (
            <div key={g.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderLeft: `4px solid ${statusColor}`, borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <Target size={14} color={statusColor} />
                    <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>{g.title}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(129,140,248,0.12)', color: '#818CF8' }}>{g.type}</span>
                    <StatusBadge status={g.status} small />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                    <OwnerAvatar name={g.owner} size={20} showName />
                    <span>Period: {g.period}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '400px' }}>
                    <ProgressBar value={g.currentValue} max={g.targetValue} color={statusColor} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{g.currentValue.toLocaleString()} / {g.targetValue.toLocaleString()} {g.unit}</span>
                  </div>
                  {linkedCamps.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      <Link size={12} color="var(--text-tertiary)" />
                      {linkedCamps.map(c => (
                        <span key={c.id} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(99,102,241,0.1)', color: '#818CF8', fontWeight: 600 }}>{c.name}</span>
                      ))}
                    </div>
                  )}
                </div>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button onClick={() => openEdit(g)} aria-label="Edit goal" style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}><Edit3 size={12} /> Edit</button>
                    <button onClick={() => handleDelete(g.id, g.title)} aria-label="Delete goal" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={12} /></button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit Goal' : 'Create Marketing Goal'} onClose={() => setShowModal(false)} width="500px">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div><label htmlFor="goal-title" style={lbl}>Title *</label><input id="goal-title" style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="goal-type-sel" style={lbl}>Type</label><select id="goal-type-sel" style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>{GOAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label htmlFor="goal-owner-sel" style={lbl}>Owner</label><select id="goal-owner-sel" style={inputStyle} value={form.owner} onChange={e => setForm(p => ({ ...p, owner: e.target.value }))}>{TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label htmlFor="goal-status-sel" style={lbl}>Status</label><select id="goal-status-sel" style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>{STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="goal-target" style={lbl}>Target Value</label><input id="goal-target" type="number" style={inputStyle} value={form.targetValue} onChange={e => setForm(p => ({ ...p, targetValue: Number(e.target.value) }))} /></div>
              <div><label htmlFor="goal-current" style={lbl}>Current Value</label><input id="goal-current" type="number" style={inputStyle} value={form.currentValue} onChange={e => setForm(p => ({ ...p, currentValue: Number(e.target.value) }))} /></div>
              <div><label htmlFor="goal-unit" style={lbl}>Unit</label><input id="goal-unit" style={inputStyle} value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} placeholder="e.g. bookings, %" /></div>
            </div>
            <div><label htmlFor="goal-period" style={lbl}>Period</label><input id="goal-period" style={inputStyle} value={form.period} onChange={e => setForm(p => ({ ...p, period: e.target.value }))} placeholder="e.g. Q4 2026, Monthly" /></div>
            <div>
              <label style={lbl}>Linked Campaigns</label>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {campaigns.map(c => {
                  const active = (form.linkedCampaignIds || []).includes(c.id);
                  return <button key={c.id} type="button" onClick={() => toggleLinkedCampaign(c.id)} style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.75rem', border: `1px solid ${active ? 'var(--primary-color)' : 'var(--border-color)'}`, background: active ? 'rgba(99,102,241,0.15)' : 'transparent', color: active ? 'var(--primary-color)' : 'var(--text-secondary)' }}>{c.name}</button>;
                })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Goal</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GoalsAndOKRs;
