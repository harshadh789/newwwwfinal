import React, { useState } from 'react';
import { DollarSign, Plus, Edit3, Trash2, Calendar, Target, AlertTriangle, TrendingDown } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import StatusBadge from './components/StatusBadge';
import OwnerAvatar from './components/OwnerAvatar';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import QuickStatCard from './components/QuickStatCard';
import { BUDGET_CATEGORIES, MONTHS, MONTH_FULL, formatINR, TEAM_MEMBERS, inputStyle, lbl } from './constants';

const BudgetTracker = ({ budget, campaigns, isAdmin, loadData }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [monthFilter, setMonthFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ campaignId: '', category: BUDGET_CATEGORIES[0], allocatedINR: 0, spentINR: 0, owner: TEAM_MEMBERS[0], month: MONTH_FULL[new Date().getMonth()], notes: '' });

  const filtered = budget.filter(b => {
    const c = campaigns.find(camp => camp.id === b.campaignId);
    if (search && !(c?.name || '').toLowerCase().includes(search.toLowerCase()) && !(b.notes || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== 'ALL' && b.category !== categoryFilter) return false;
    if (monthFilter !== 'ALL' && b.month !== monthFilter) return false;
    return true;
  });

  const totalAllocated = filtered.reduce((s, b) => s + (b.allocatedINR || 0), 0);
  const totalSpent = filtered.reduce((s, b) => s + (b.spentINR || 0), 0);
  const utilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
  
  // Find at risk items (spent > allocated)
  const overBudget = filtered.filter(b => (b.spentINR || 0) > (b.allocatedINR || 0));

  const openAdd = () => { setEditing(null); setForm({ campaignId: campaigns[0]?.id || '', category: BUDGET_CATEGORIES[0], allocatedINR: 0, spentINR: 0, owner: TEAM_MEMBERS[0], month: MONTH_FULL[new Date().getMonth()], notes: '' }); setShowModal(true); };
  const openEdit = (b) => { setEditing(b); setForm({ ...b }); setShowModal(true); };
  const handleDelete = async (id) => { if (window.confirm('Delete this budget item?')) { await dataService.deleteMarketingBudgetItem(id); loadData(); } };
  const handleSave = async (e) => { e.preventDefault(); await dataService.saveMarketingBudgetItem(editing ? { ...form, id: editing.id } : form); setShowModal(false); loadData(); };

  // Category breakdown
  const categoryBreakdown = BUDGET_CATEGORIES.map(cat => {
    const items = filtered.filter(b => b.category === cat);
    return {
      category: cat,
      allocated: items.reduce((s, b) => s + (b.allocatedINR || 0), 0),
      spent: items.reduce((s, b) => s + (b.spentINR || 0), 0)
    };
  }).filter(c => c.allocated > 0 || c.spent > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <QuickStatCard icon={Target} label="Total Allocated" value={formatINR(totalAllocated)} color="#818CF8" />
        <QuickStatCard icon={DollarSign} label="Total Spent" value={formatINR(totalSpent)} color="#10B981" />
        <QuickStatCard icon={TrendingDown} label="Remaining Budget" value={formatINR(totalAllocated - totalSpent)} color={totalAllocated - totalSpent < 0 ? '#EF4444' : '#3B82F6'} />
        <QuickStatCard icon={AlertTriangle} label="Over Budget Items" value={overBudget.length} color={overBudget.length > 0 ? '#EF4444' : '#6B7280'} />
      </div>

      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search campaigns or notes..."
        filters={[
          { id: 'bt-cat', label: 'Category', value: categoryFilter, onChange: setCategoryFilter, options: BUDGET_CATEGORIES.map(c => ({ value: c, label: c })) },
          { id: 'bt-mon', label: 'Month', value: monthFilter, onChange: setMonthFilter, options: MONTH_FULL.map(m => ({ value: m, label: m })) },
        ]}
      >
        {isAdmin && <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Add Budget Item</button>}
      </FilterBar>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
        
        {/* Main List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No budget items match filters.</div>}
          {filtered.map(b => {
            const camp = campaigns.find(c => c.id === b.campaignId);
            const over = b.spentINR > b.allocatedINR;
            const pct = b.allocatedINR > 0 ? (b.spentINR / b.allocatedINR) * 100 : 0;
            return (
              <div key={b.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderLeft: over ? '4px solid #EF4444' : '4px solid #F59E0B', borderRadius: '12px', padding: '1.1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.15rem' }}>{camp?.name || 'Unknown Campaign'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)' }}>{b.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Calendar size={11} /> {b.month}</span>
                      <OwnerAvatar name={b.owner} size={18} showName />
                    </div>
                  </div>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => openEdit(b)} aria-label="Edit budget item" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDelete(b.id)} aria-label="Delete budget item" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div><div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Allocated</div><div style={{ fontSize: '1rem', fontWeight: 700, color: '#818CF8' }}>{formatINR(b.allocatedINR)}</div></div>
                  <div><div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Spent</div><div style={{ fontSize: '1rem', fontWeight: 700, color: over ? '#EF4444' : '#10B981' }}>{formatINR(b.spentINR)}</div></div>
                  <div><div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700 }}>Remaining</div><div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatINR(b.allocatedINR - b.spentINR)}</div></div>
                </div>

                <ProgressBar value={b.spentINR} max={b.allocatedINR} color={over ? '#EF4444' : '#F59E0B'} label={`${Math.round(pct)}% Used`} />
                
                {b.notes && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>Notes: {b.notes}</div>}
              </div>
            );
          })}
        </div>

        {/* Sidebar Breakdown */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Category Breakdown</h3>
          {categoryBreakdown.length === 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>No data.</div>}
          {categoryBreakdown.map(cb => {
            const pct = cb.allocated > 0 ? (cb.spent / cb.allocated) * 100 : 0;
            return (
              <div key={cb.category} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span>{cb.category}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatINR(cb.allocated)}</span>
                </div>
                <ProgressBar value={cb.spent} max={cb.allocated} height={6} showLabel={false} color="#3B82F6" />
                <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', textAlign: 'right' }}>Spent: {formatINR(cb.spent)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit Budget Item' : 'Add Budget Item'} onClose={() => setShowModal(false)} width="460px">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div><label htmlFor="b-camp" style={lbl}>Campaign *</label><select id="b-camp" style={inputStyle} value={form.campaignId} onChange={e => setForm(p => ({ ...p, campaignId: e.target.value }))} required><option value="">Select a campaign...</option>{campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="b-cat" style={lbl}>Category</label><select id="b-cat" style={inputStyle} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>{BUDGET_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label htmlFor="b-mon" style={lbl}>Month</label><select id="b-mon" style={inputStyle} value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))}>{MONTH_FULL.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="b-alloc" style={lbl}>Allocated (INR)</label><input id="b-alloc" type="number" style={inputStyle} value={form.allocatedINR} onChange={e => setForm(p => ({ ...p, allocatedINR: Number(e.target.value) }))} required /></div>
              <div><label htmlFor="b-spent" style={lbl}>Spent (INR)</label><input id="b-spent" type="number" style={inputStyle} value={form.spentINR} onChange={e => setForm(p => ({ ...p, spentINR: Number(e.target.value) }))} /></div>
            </div>
            <div><label htmlFor="b-owner" style={lbl}>Owner</label><select id="b-owner" style={inputStyle} value={form.owner} onChange={e => setForm(p => ({ ...p, owner: e.target.value }))}>{TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label htmlFor="b-notes" style={lbl}>Notes</label><textarea id="b-notes" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} /></div>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Budget</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default BudgetTracker;
