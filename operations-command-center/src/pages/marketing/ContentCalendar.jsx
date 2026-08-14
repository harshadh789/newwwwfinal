import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Calendar } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import StatusBadge from './components/StatusBadge';
import OwnerAvatar from './components/OwnerAvatar';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import { ALL_CHANNELS, CHANNEL_ICONS, FUNNEL_CATEGORIES, TEAM_MEMBERS, inputStyle, lbl } from './constants';

const POST_STATUSES = ['Draft', 'Scheduled', 'Published', 'Approved'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ContentCalendar = ({ posts, campaigns, isAdmin, loadData }) => {
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', channel: 'Instagram', funnelCategory: 'Awareness', scheduledDate: '', status: 'Draft', author: TEAM_MEMBERS[0], campaignId: '', caption: '', hashtags: '' });

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (channelFilter !== 'ALL' && p.channel !== channelFilter) return false;
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    return true;
  });

  const openAdd = () => { setEditing(null); setForm({ title: '', channel: 'Instagram', funnelCategory: 'Awareness', scheduledDate: '', status: 'Draft', author: TEAM_MEMBERS[0], campaignId: '', caption: '', hashtags: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p }); setShowModal(true); };
  const handleDelete = async (id, title) => { if (window.confirm(`Delete "${title}"?`)) { await dataService.deleteContentPost(id); loadData(); } };
  const handleSave = async (e) => { e.preventDefault(); await dataService.saveContentPost(editing ? { ...form, id: editing.id } : form); setShowModal(false); loadData(); };

  // Calendar grid
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search content..."
        filters={[
          { id: 'cc-channel', label: 'Channel', value: channelFilter, onChange: setChannelFilter, options: ALL_CHANNELS.map(c => ({ value: c, label: c })) },
          { id: 'cc-status', label: 'Status', value: statusFilter, onChange: setStatusFilter, options: POST_STATUSES.map(s => ({ value: s, label: s })) },
        ]}
      >
        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.15rem' }}>
          {['list', 'calendar'].map(v => (
            <button key={v} onClick={() => setViewMode(v)} style={{ padding: '0.35rem 0.7rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, background: viewMode === v ? 'var(--primary-color)' : 'transparent', color: viewMode === v ? '#0f172a' : 'var(--text-tertiary)', textTransform: 'capitalize' }}>{v}</button>
          ))}
        </div>
        {isAdmin && <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Add Content</button>}
      </FilterBar>

      {viewMode === 'calendar' ? (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 700 }}>{MONTHS_SHORT[currentMonth]} {currentYear}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} style={{ padding: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textAlign: 'center', background: 'var(--card-bg)' }}>{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} style={{ background: 'var(--card-bg)', minHeight: '80px' }} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayPosts = filtered.filter(p => p.scheduledDate === dateStr);
              const isToday = day === now.getDate();
              return (
                <div key={day} style={{ background: 'var(--card-bg)', minHeight: '80px', padding: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: isToday ? 800 : 600, color: isToday ? 'var(--primary-color)' : 'var(--text-tertiary)', marginBottom: '0.15rem' }}>{day}</div>
                  {dayPosts.map(p => {
                    const fc = FUNNEL_CATEGORIES.find(f => f.value === p.funnelCategory) || FUNNEL_CATEGORIES[0];
                    return (
                      <div key={p.id} onClick={() => openEdit(p)} title={p.title} style={{ fontSize: '0.63rem', padding: '0.15rem 0.3rem', borderRadius: '4px', background: `${fc.color}18`, color: fc.color, fontWeight: 600, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                        {CHANNEL_ICONS[p.channel]} {p.title}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem' }}>
          {filtered.length === 0 && <div style={{ gridColumn: '1/-1', padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No content posts match filters.</div>}
          {filtered.map(p => {
            const fc = FUNNEL_CATEGORIES.find(f => f.value === p.funnelCategory) || FUNNEL_CATEGORIES[0];
            const campName = campaigns.find(c => c.id === p.campaignId)?.name;
            return (
              <div key={p.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', fontWeight: 700, color: fc.color }}>{CHANNEL_ICONS[p.channel]} {p.channel}</span>
                      <StatusBadge status={p.status} small />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.35rem', borderRadius: '4px', background: fc.bg, color: fc.color }}>{fc.label}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{p.title}</div>
                  </div>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => openEdit(p)} aria-label="Edit post" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDelete(p.id, p.title)} aria-label="Delete post" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {p.scheduledDate && <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Calendar size={11} /> {p.scheduledDate}</span>}
                  <OwnerAvatar name={p.author} size={18} showName />
                  {campName && <span style={{ color: '#818CF8' }}>/ {campName}</span>}
                </div>
                {p.caption && <div style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.15rem' }}>"{p.caption}"</div>}
                {p.hashtags && <div style={{ fontSize: '0.7rem', color: '#818CF8' }}>{p.hashtags}</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit Content Post' : 'Add Content Post'} onClose={() => setShowModal(false)} width="500px">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div><label htmlFor="cp-title" style={lbl}>Title *</label><input id="cp-title" style={inputStyle} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="cp-channel" style={lbl}>Channel</label><select id="cp-channel" style={inputStyle} value={form.channel} onChange={e => setForm(p => ({ ...p, channel: e.target.value }))}>{ALL_CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label htmlFor="cp-funnel" style={lbl}>Funnel Stage</label><select id="cp-funnel" style={inputStyle} value={form.funnelCategory} onChange={e => setForm(p => ({ ...p, funnelCategory: e.target.value }))}>{FUNNEL_CATEGORIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>
              <div><label htmlFor="cp-status" style={lbl}>Status</label><select id="cp-status" style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>{POST_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="cp-date" style={lbl}>Scheduled Date</label><input id="cp-date" type="date" style={inputStyle} value={form.scheduledDate} onChange={e => setForm(p => ({ ...p, scheduledDate: e.target.value }))} /></div>
              <div><label htmlFor="cp-author" style={lbl}>Author</label><select id="cp-author" style={inputStyle} value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))}>{TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <div><label htmlFor="cp-campaign" style={lbl}>Linked Campaign</label><select id="cp-campaign" style={inputStyle} value={form.campaignId || ''} onChange={e => setForm(p => ({ ...p, campaignId: e.target.value }))}><option value="">None</option>{campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div><label htmlFor="cp-caption" style={lbl}>Caption</label><textarea id="cp-caption" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.caption || ''} onChange={e => setForm(p => ({ ...p, caption: e.target.value }))} /></div>
            <div><label htmlFor="cp-hashtags" style={lbl}>Hashtags</label><input id="cp-hashtags" style={inputStyle} value={form.hashtags || ''} onChange={e => setForm(p => ({ ...p, hashtags: e.target.value }))} placeholder="#GoCampFly #LuxuryTravel" /></div>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Post</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ContentCalendar;
