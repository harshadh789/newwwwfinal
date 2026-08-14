import React, { useState } from 'react';
import { Megaphone, Plus, Edit3, Trash2, ChevronDown, ChevronUp, Check, Calendar, Plane, Link, DollarSign } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import StatusBadge from './components/StatusBadge';
import PriorityBadge from './components/PriorityBadge';
import OwnerAvatar from './components/OwnerAvatar';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import Modal from './components/Modal';
import { ALL_CHANNELS, CHANNEL_ICONS, FUNNEL_CATEGORIES, STAGES, MONTH_FULL, TEAM_MEMBERS, formatINR, inputStyle, lbl } from './constants';

const CampaignWorkboard = ({ tours, campaigns, goals, tasks, budget, milestones, isAdmin, loadData, onCreateCampaign, onEditCampaign }) => {
  const [search, setSearch] = useState('');
  const [funnelFilter, setFunnelFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('card');
  const [expandedId, setExpandedId] = useState(null);

  const allItems = [
    ...tours.filter(t => t.marketing).map(t => ({ ...t, isTour: true, m: t.marketing, promotionStart: t.marketing?.promotionStart, promotionEnd: t.marketing?.promotionEnd, promotionStage: t.marketing?.promotionStage, funnelCategory: 'Awareness', priority: t.priority || 'Medium' })),
    ...campaigns.map(c => ({ ...c, isTour: false, m: c })),
  ];

  const filtered = allItems.filter(item => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (funnelFilter !== 'ALL' && item.funnelCategory !== funnelFilter) return false;
    if (stageFilter !== 'ALL' && item.promotionStage !== stageFilter) return false;
    return true;
  });

  const handleDeleteCampaign = async (id, name) => {
    if (window.confirm(`Delete campaign "${name}"?`)) {
      await dataService.deleteMarketingCampaign(id);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search campaigns..."
        filters={[
          { id: 'cw-funnel', label: 'Funnel', value: funnelFilter, onChange: setFunnelFilter, options: FUNNEL_CATEGORIES.map(f => ({ value: f.value, label: f.label })) },
          { id: 'cw-stage', label: 'Stage', value: stageFilter, onChange: setStageFilter, options: STAGES.map(s => ({ value: s.value, label: s.label })) },
        ]}
      >
        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.15rem' }}>
          {['card', 'table'].map(v => (
            <button key={v} onClick={() => setViewMode(v)} style={{ padding: '0.35rem 0.7rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, background: viewMode === v ? 'var(--primary-color)' : 'transparent', color: viewMode === v ? '#0f172a' : 'var(--text-tertiary)', textTransform: 'capitalize' }}>{v}</button>
          ))}
        </div>
        {isAdmin && <button onClick={onCreateCampaign} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={15} /> Create Campaign</button>}
      </FilterBar>

      {filtered.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No campaigns match the current filters.</div>}

      {viewMode === 'table' ? (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Type</th><th>Stage</th><th>Funnel</th><th>Priority</th><th>Window</th><th>Budget</th><th>Tasks</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const campBudget = budget.filter(b => b.campaignId === item.id);
                const allocated = campBudget.reduce((s, b) => s + (b.allocatedINR || 0), 0);
                const spent = campBudget.reduce((s, b) => s + (b.spentINR || 0), 0);
                const campTasks = tasks.filter(t => t.campaignId === item.id);
                const done = campTasks.filter(t => t.status === 'Completed').length;
                const fc = FUNNEL_CATEGORIES.find(f => f.value === item.funnelCategory) || FUNNEL_CATEGORIES[0];
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.name}</td>
                    <td><span style={{ fontSize: '0.7rem', fontWeight: 700, color: item.isTour ? '#818CF8' : '#10B981' }}>{item.isTour ? 'Tour' : 'Campaign'}</span></td>
                    <td><StatusBadge status={item.promotionStage || 'Planning'} small /></td>
                    <td><span style={{ fontSize: '0.7rem', fontWeight: 700, color: fc.color }}>{fc.label}</span></td>
                    <td><PriorityBadge priority={item.priority || 'Medium'} /></td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{item.promotionStart} - {item.promotionEnd}</td>
                    <td style={{ fontSize: '0.78rem' }}>{allocated > 0 ? `${Math.round((spent / allocated) * 100)}%` : '--'}</td>
                    <td style={{ fontSize: '0.78rem' }}>{campTasks.length > 0 ? `${done}/${campTasks.length}` : '--'}</td>
                    {isAdmin && (
                      <td>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <button onClick={() => item.isTour ? null : onEditCampaign(item)} aria-label="Edit" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={13} /></button>
                          {!item.isTour && <button onClick={() => handleDeleteCampaign(item.id, item.name)} aria-label="Delete" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.map(item => {
            const campBudget = budget.filter(b => b.campaignId === item.id);
            const allocated = campBudget.reduce((s, b) => s + (b.allocatedINR || 0), 0);
            const spent = campBudget.reduce((s, b) => s + (b.spentINR || 0), 0);
            const campTasks = tasks.filter(t => t.campaignId === item.id);
            const done = campTasks.filter(t => t.status === 'Completed').length;
            const campMilestones = milestones.filter(ms => ms.campaignId === item.id);
            const linkedGoals = goals.filter(g => (g.linkedCampaignIds || []).includes(item.id));
            const fc = FUNNEL_CATEGORIES.find(f => f.value === item.funnelCategory) || FUNNEL_CATEGORIES[0];
            const stage = STAGES.find(s => s.value === item.promotionStage) || STAGES[0];
            const channels = item.m?.channels || (item.m?.channelStrategy ? item.m.channelStrategy.split(',').map(c => c.trim()) : []);
            const expanded = expandedId === item.id;

            return (
              <div key={item.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderLeft: `4px solid ${stage.color}`, borderRadius: '14px', overflow: 'hidden' }}>
                <div onClick={() => setExpandedId(expanded ? null : item.id)} style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.name}</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', background: item.isTour ? 'rgba(129,140,248,0.12)' : 'rgba(16,185,129,0.12)', color: item.isTour ? '#818CF8' : '#10B981' }}>{item.isTour ? 'Tour' : 'Campaign'}</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', background: fc.bg, color: fc.color }}>{fc.label}</span>
                      <StatusBadge status={item.promotionStage || 'Planning'} small />
                      <PriorityBadge priority={item.priority || 'Medium'} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Calendar size={12} /> {item.promotionStart} - {item.promotionEnd}</span>
                      {allocated > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><DollarSign size={12} /> {Math.round((spent / allocated) * 100)}% spent</span>}
                      {campTasks.length > 0 && <span>Tasks: {done}/{campTasks.length}</span>}
                      {campMilestones.length > 0 && <span>Milestones: {campMilestones.filter(ms => ms.status === 'Completed').length}/{campMilestones.length}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isAdmin && (
                      <>
                        <button onClick={e => { e.stopPropagation(); item.isTour ? null : onEditCampaign(item); }} aria-label="Edit campaign" style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.3rem 0.55rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}><Edit3 size={12} /> Edit</button>
                        {!item.isTour && <button onClick={e => { e.stopPropagation(); handleDeleteCampaign(item.id, item.name); }} aria-label="Delete campaign" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={12} /></button>}
                      </>
                    )}
                    <span style={{ color: 'var(--text-tertiary)' }}>{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                  </div>
                </div>

                {expanded && (
                  <div style={{ padding: '0.75rem 1.25rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    {/* Left: details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div>
                        <div style={lbl}>Active Channels</div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                          {channels.map(ch => <span key={ch} style={{ padding: '0.2rem 0.55rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(99,102,241,0.1)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>{CHANNEL_ICONS[ch]} {ch}</span>)}
                        </div>
                      </div>
                      <div><div style={lbl}>Target Audience</div><p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.m?.targetAudience || '--'}</p></div>
                      <div><div style={lbl}>Content Strategy</div><p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.m?.contentStrategy || '--'}</p></div>
                      {(item.m?.keyMessages || []).length > 0 && (
                        <div><div style={lbl}>Key Messages</div><ul style={{ margin: '0.2rem 0 0', paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{(item.m.keyMessages).map((msg, i) => <li key={i}>{msg}</li>)}</ul></div>
                      )}
                    </div>

                    {/* Right: linked data */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {linkedGoals.length > 0 && (
                        <div>
                          <div style={lbl}>Linked Goals</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.25rem' }}>
                            {linkedGoals.map(g => <div key={g.id} style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem', borderRadius: '6px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Link size={11} color="#10B981" />{g.title}</div>)}
                          </div>
                        </div>
                      )}
                      {allocated > 0 && (
                        <div>
                          <div style={lbl}>Budget</div>
                          <div style={{ marginTop: '0.25rem' }}>
                            <ProgressBar value={spent} max={allocated} color="#F59E0B" label={`${formatINR(spent)} / ${formatINR(allocated)}`} />
                          </div>
                        </div>
                      )}
                      {campTasks.length > 0 && (
                        <div>
                          <div style={lbl}>Tasks ({done}/{campTasks.length})</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {campTasks.slice(0, 5).map(t => (
                              <div key={t.id} style={{ fontSize: '0.77rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: t.status === 'Completed' ? '#10B981' : 'var(--text-secondary)' }}>
                                {t.status === 'Completed' ? <Check size={12} color="#10B981" /> : <span style={{ width: 12, height: 12, borderRadius: '3px', border: '1.5px solid var(--border-color)', display: 'inline-block' }} />}
                                <span style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none' }}>{t.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {campMilestones.length > 0 && (
                        <div>
                          <div style={lbl}>Milestones</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                            {campMilestones.map(ms => (
                              <div key={ms.id} style={{ fontSize: '0.77rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span style={{ width: 8, height: 8, transform: 'rotate(45deg)', background: ms.status === 'Completed' ? '#10B981' : ms.status === 'Missed' ? '#EF4444' : '#EC4899', display: 'inline-block', borderRadius: '1px' }} />
                                <span>{ms.title}</span>
                                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>({ms.dueDate})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignWorkboard;
