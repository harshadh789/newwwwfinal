import React, { useState } from 'react';
import { Target, Megaphone, Calendar, DollarSign, CheckCircle2, AlertTriangle, TrendingUp, Users, ChevronUp, ChevronDown, Edit3, Trash2, Plus, Plane, Globe, Zap, Diamond } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import QuickStatCard from './components/QuickStatCard';
import StatusBadge from './components/StatusBadge';
import PriorityBadge from './components/PriorityBadge';
import OwnerAvatar from './components/OwnerAvatar';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';
import { formatINR, FUNNEL_CATEGORIES, STAGES, MONTH_IDX, CHANNEL_ICONS, TEAM_MEMBERS, inputStyle, lbl } from './constants';

// ── MarketingPlanDashboard: the "single source of truth" view ──────────────────
const MarketingPlanDashboard = ({ tours, campaigns, companyMarketing, priorities, goals, milestones, budget, risks, tasks, approvals, isAdmin, loadData }) => {
  const [expandBrand, setExpandBrand] = useState(false);
  const [editingPos, setEditingPos] = useState(false);
  const [posForm, setPosForm] = useState({ coreMessage: '', brandPositioning: '' });

  // ── Risk modal state ──
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [riskForm, setRiskForm] = useState({ title: '', severity: 'Medium', status: 'Open', owner: TEAM_MEMBERS[0], linkedCampaignId: '', mitigation: '' });

  const m = companyMarketing || {};

  // ── Stats ──
  const goalsOnTrack = goals.filter(g => g.status === 'On Track').length;
  const goalsAtRisk = goals.filter(g => g.status === 'At Risk').length;
  const goalsBehind = goals.filter(g => g.status === 'Behind').length;
  const activeCampaigns = campaigns.length;
  const openTasks = tasks.filter(t => t.status !== 'Completed').length;
  const overdueTasks = tasks.filter(t => t.status !== 'Completed' && t.dueDate && new Date(t.dueDate) < new Date()).length;
  const totalAllocated = budget.reduce((s, b) => s + (b.allocatedINR || 0), 0);
  const totalSpent = budget.reduce((s, b) => s + (b.spentINR || 0), 0);
  const msCompleted = milestones.filter(ms => ms.status === 'Completed').length;
  const msTotal = milestones.length;
  const openRisks = risks.filter(r => r.status === 'Open').length;

  // ── Timeline helpers ──
  const allItems = [
    ...tours.filter(t => t.marketing).map(t => ({
      id: t.id, name: t.name, type: 'Tour',
      start: MONTH_IDX[t.marketing?.promotionStart] ?? 0,
      end: MONTH_IDX[t.marketing?.promotionEnd] ?? 11,
      stage: t.marketing?.promotionStage,
      color: '#818CF8',
    })),
    ...campaigns.map(c => ({
      id: c.id, name: c.name, type: 'Campaign',
      start: MONTH_IDX[c.promotionStart] ?? 0,
      end: MONTH_IDX[c.promotionEnd] ?? 11,
      stage: c.promotionStage,
      color: '#10B981',
    })),
  ];
  const nowMonth = new Date().getMonth();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // ── Brand Direction handlers ──
  const startEditPos = () => {
    setPosForm({ coreMessage: m.coreMessage || '', brandPositioning: m.brandPositioning || '' });
    setEditingPos(true);
  };
  const handleSavePos = async () => {
    await dataService.saveCompanyMarketing(posForm);
    setEditingPos(false);
    loadData();
  };

  // ── Risk handlers ──
  const openAddRisk = () => {
    setEditingRisk(null);
    setRiskForm({ title: '', severity: 'Medium', status: 'Open', owner: TEAM_MEMBERS[0], linkedCampaignId: '', mitigation: '' });
    setShowRiskModal(true);
  };
  const openEditRisk = (r) => {
    setEditingRisk(r);
    setRiskForm(r);
    setShowRiskModal(true);
  };
  const handleSaveRisk = async (e) => {
    e.preventDefault();
    await dataService.saveMarketingRisk(editingRisk ? { ...riskForm, id: editingRisk.id } : riskForm);
    setShowRiskModal(false);
    loadData();
  };
  const handleDeleteRisk = async (id, name) => {
    if (window.confirm(`Delete risk "${name}"?`)) {
      await dataService.deleteMarketingRisk(id);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Plan Health Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <QuickStatCard icon={Target} label="Goals On Track" value={`${goalsOnTrack} / ${goals.length}`} sub={goalsAtRisk > 0 ? `${goalsAtRisk} at risk, ${goalsBehind} behind` : 'All goals healthy'} color="#10B981" />
        <QuickStatCard icon={Megaphone} label="Active Campaigns" value={activeCampaigns} sub={`Across ${new Set(campaigns.map(c => c.funnelCategory)).size} funnel stages`} color="#818CF8" />
        <QuickStatCard icon={CheckCircle2} label="Open Tasks" value={openTasks} sub={overdueTasks > 0 ? `${overdueTasks} overdue` : 'No overdue tasks'} color={overdueTasks > 0 ? '#EF4444' : '#3B82F6'} />
        <QuickStatCard icon={DollarSign} label="Budget Utilization" value={`${totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}%`} sub={`${formatINR(totalSpent)} of ${formatINR(totalAllocated)}`} color="#F59E0B" />
        <QuickStatCard icon={Diamond} label="Milestones" value={`${msCompleted} / ${msTotal}`} sub={`${milestones.filter(ms => ms.status === 'Upcoming').length} upcoming`} color="#EC4899" />
      </div>

      {/* Operations Handover & Demand Transparency (Connected Workflow) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(59, 130, 246, 0.08))',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '14px',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Megaphone size={17} color="#EC4899" /> Operations → Marketing Handover Demand
              </h3>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.2)', color: '#F472B6', fontWeight: 700 }}>
                {tours.length} Tours in Pipeline
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Full transparency on tours created by Operations, monthly creative deliverables, and required campaign budgets.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>Total Creatives:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#EC4899' }}>
                {tours.reduce((sum, t) => sum + (t.marketingNeeds?.creativesRequired || 4), 0)} Assets
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '0.75rem' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>Required Ad Budget:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#60A5FA' }}>
                {formatINR(tours.reduce((sum, t) => sum + (t.marketingNeeds?.estimatedBudget || 100000), 0))}
              </div>
            </div>
          </div>
        </div>

        {/* Handover Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {tours.map(t => {
            const hasCamp = campaigns.some(c => c.name.toLowerCase().includes(t.name.toLowerCase()) || c.id === t.id);
            return (
              <div
                key={t.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{t.name}</span>
                    <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}>
                      {t.travelMonth}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                    {t.destination} • {t.sales?.targetCustomers || 20} Pax Target
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', background: 'rgba(0,0,0,0.25)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                    <span>🎨 <strong>{t.marketingNeeds?.creativesRequired || 4}</strong> Creatives</span>
                    <span>💰 <strong>{formatINR(t.marketingNeeds?.estimatedBudget || 100000)}</strong> Budget</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                  <span style={{ fontSize: '0.7rem', color: hasCamp ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                    {hasCamp ? '✓ Campaign Active' : '⚠ Campaign Pending'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                    Target Launch: {t.marketing?.promotionStart || t.travelMonth}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goals Progress Strip */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={16} color="var(--primary-color)" /> Goals Progress
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {goals.map(g => {
            const pct = g.targetValue > 0 ? Math.round((g.currentValue / g.targetValue) * 100) : 0;
            const statusColor = g.status === 'On Track' ? '#10B981' : g.status === 'At Risk' ? '#F59E0B' : '#EF4444';
            return (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{g.title}</span>
                    <StatusBadge status={g.status} small />
                  </div>
                  <ProgressBar value={g.currentValue} max={g.targetValue} color={statusColor} />
                </div>
                <OwnerAvatar name={g.owner} size={22} showName={false} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', minWidth: '5rem', textAlign: 'right' }}>
                  {g.currentValue.toLocaleString()} / {g.targetValue.toLocaleString()} {g.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unified Gantt Timeline */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', overflowX: 'auto' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} color="#F59E0B" /> Promotion Timeline 2026
        </h3>
        <div style={{ minWidth: '700px' }}>
          {/* Month headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(12, 1fr)', gap: 0, marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>ITEM</div>
            {months.map((m, i) => (
              <div key={m} style={{ fontSize: '0.68rem', fontWeight: 700, color: i === nowMonth ? 'var(--primary-color)' : 'var(--text-tertiary)', textAlign: 'center', borderBottom: i === nowMonth ? '2px solid var(--primary-color)' : '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>{m}</div>
            ))}
          </div>

          {allItems.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '180px repeat(12, 1fr)', gap: 0, marginBottom: '0.35rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: item.color, textTransform: 'uppercase', marginRight: '0.3rem' }}>{item.type}</span>
                {item.name}
              </div>
              {months.map((_, i) => {
                const inRange = i >= item.start && i <= item.end;
                const isStart = i === item.start;
                const isEnd = i === item.end;
                return (
                  <div key={i} style={{ height: '22px', padding: '0 1px', display: 'flex', alignItems: 'center' }}>
                    {inRange && (
                      <div style={{
                        width: '100%', height: '14px',
                        background: `${item.color}35`,
                        borderLeft: isStart ? `3px solid ${item.color}` : 'none',
                        borderRight: isEnd ? `3px solid ${item.color}` : 'none',
                        borderRadius: isStart && isEnd ? '4px' : isStart ? '4px 0 0 4px' : isEnd ? '0 4px 4px 0' : '0',
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Milestone markers */}
          {milestones.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(12, 1fr)', gap: 0, marginTop: '0.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#EC4899' }}>MILESTONES</div>
              {months.map((_, i) => {
                const msInMonth = milestones.filter(ms => {
                  const d = new Date(ms.dueDate);
                  return d.getMonth() === i;
                });
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
                    {msInMonth.map(ms => (
                      <span key={ms.id} title={ms.title} style={{
                        width: 10, height: 10, transform: 'rotate(45deg)',
                        background: ms.status === 'Completed' ? '#10B981' : ms.status === 'Missed' ? '#EF4444' : '#EC4899',
                        display: 'inline-block', borderRadius: '2px', cursor: 'pointer',
                      }} />
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* Today line indicator */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(12, 1fr)', gap: 0, marginTop: '0.25rem' }}>
            <div />
            {months.map((_, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                {i === nowMonth && <div style={{ width: '2px', height: '8px', background: 'var(--primary-color)', margin: '0 auto', borderRadius: '1px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Quick Board */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Megaphone size={16} color="#818CF8" /> Campaign Status Board
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {STAGES.map(stage => {
            const items = [...campaigns.filter(c => c.promotionStage === stage.value), ...tours.filter(t => t.marketing?.promotionStage === stage.value).map(t => ({ ...t, name: t.name, isTour: true }))];
            return (
              <div key={stage.value} style={{ borderTop: `3px solid ${stage.color}`, borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: stage.color, textTransform: 'uppercase', marginBottom: '0.65rem' }}>{stage.label} ({items.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.length === 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No items</div>}
                  {items.map(item => {
                    const budgetForCamp = budget.filter(b => b.campaignId === item.id);
                    const campBudgetTotal = budgetForCamp.reduce((s, b) => s + (b.allocatedINR || 0), 0);
                    const campSpentTotal = budgetForCamp.reduce((s, b) => s + (b.spentINR || 0), 0);
                    const campTasks = tasks.filter(t => t.campaignId === item.id);
                    const campTasksDone = campTasks.filter(t => t.status === 'Completed').length;
                    return (
                      <div key={item.id} style={{ padding: '0.65rem 0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.name}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                          {item.isTour && <span style={{ color: '#818CF8' }}>Tour</span>}
                          {campBudgetTotal > 0 && <span>Budget: {Math.round((campSpentTotal / campBudgetTotal) * 100)}%</span>}
                          {campTasks.length > 0 && <span>Tasks: {campTasksDone}/{campTasks.length}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risks & Blockers */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={16} color="#EF4444" /> Risks & Blockers ({openRisks} open)
          </h3>
          {isAdmin && (
            <button onClick={openAddRisk} className="btn btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Plus size={14} /> Add Risk
            </button>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {risks.length === 0 && <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>No risks logged.</div>}
          {risks.map(r => {
            const sevColor = r.severity === 'High' ? '#EF4444' : r.severity === 'Medium' ? '#F59E0B' : '#6B7280';
            const campName = campaigns.find(c => c.id === r.linkedCampaignId)?.name || '';
            return (
              <div key={r.id} style={{ padding: '0.85rem 1rem', background: `${sevColor}08`, border: `1px solid ${sevColor}25`, borderLeft: `4px solid ${sevColor}`, borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {r.title}
                      <PriorityBadge priority={r.severity} />
                      <StatusBadge status={r.status} small />
                    </div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--text-tertiary)', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <OwnerAvatar name={r.owner} size={18} showName />
                      {campName && <span style={{ color: '#818CF8' }}>/ {campName}</span>}
                    </div>
                  </div>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button onClick={() => openEditRisk(r)} aria-label="Edit risk" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteRisk(r.id, r.title)} aria-label="Delete risk" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                  )}
                </div>
                {r.mitigation && <div style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.15)', padding: '0.45rem 0.6rem', borderRadius: '6px' }}>Mitigation: {r.mitigation}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Direction (collapsible) */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <button onClick={() => setExpandBrand(e => !e)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 700 }}>
            <Globe size={16} color="var(--primary-color)" /> Brand Direction & Strategy
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>{expandBrand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
        </button>
        {expandBrand && (
          <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Positioning */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                {editingPos ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div><label htmlFor="dash-core-msg" style={lbl}>Core Message</label><textarea id="dash-core-msg" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={posForm.coreMessage} onChange={e => setPosForm(p => ({ ...p, coreMessage: e.target.value }))} /></div>
                    <div><label htmlFor="dash-brand-pos" style={lbl}>Brand Positioning</label><textarea id="dash-brand-pos" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={posForm.brandPositioning} onChange={e => setPosForm(p => ({ ...p, brandPositioning: e.target.value }))} /></div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={() => setEditingPos(false)} className="btn btn-outline" style={{ flex: 1, padding: '0.35rem' }}>Cancel</button>
                      <button type="button" onClick={handleSavePos} className="btn btn-primary" style={{ flex: 2, padding: '0.35rem' }}>Save</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div>
                      <div style={lbl}>Core Message</div>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{m.coreMessage || '—'}</p>
                    </div>
                    <div>
                      <div style={lbl}>Brand Positioning</div>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)' }}>{m.brandPositioning || '—'}</p>
                    </div>
                  </div>
                )}
              </div>
              {isAdmin && !editingPos && (
                <button onClick={startEditPos} aria-label="Edit Brand Direction" style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Edit3 size={12} /> Edit
                </button>
              )}
            </div>

            {/* Audiences */}
            <div>
              <div style={lbl}>Audience Segments</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {(m.audiences || []).map(a => (
                  <span key={a.id} style={{ padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.77rem', fontWeight: 600, background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}30` }}>{a.name}</span>
                ))}
              </div>
            </div>

            {/* Channel Strategy */}
            <div>
              <div style={lbl}>Channel Strategy</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {(m.channelStrategies || []).map(ch => {
                  const pColor = ch.priority === 'Primary' ? '#10B981' : ch.priority === 'Secondary' ? '#F59E0B' : '#6B7280';
                  return (
                    <span key={ch.id} style={{ padding: '0.3rem 0.65rem', borderRadius: '8px', fontSize: '0.77rem', fontWeight: 600, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {ch.name}
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: pColor, background: `${pColor}18`, padding: '0.05rem 0.3rem', borderRadius: '3px' }}>{ch.priority}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Strategic Alignment */}
            {priorities?.length > 0 && (
              <div>
                <div style={lbl}>Strategic Alignment</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.3rem' }}>
                  {priorities.map(p => (
                    <div key={p.id} style={{ padding: '0.45rem 0.65rem', background: 'rgba(245,158,11,0.06)', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.18)' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F59E0B' }}>{p.name}</span>
                      {p.departmentContributions?.Marketing && <span style={{ fontSize: '0.73rem', color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>-- {p.departmentContributions.Marketing}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Risk Modal */}
      {showRiskModal && (
        <Modal title={editingRisk ? 'Edit Risk' : 'Add Risk / Blocker'} onClose={() => setShowRiskModal(false)} width="420px">
          <form onSubmit={handleSaveRisk} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div><label htmlFor="risk-title" style={lbl}>Risk Title *</label><input id="risk-title" style={inputStyle} value={riskForm.title} onChange={e => setRiskForm(p => ({ ...p, title: e.target.value }))} required /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="risk-severity" style={lbl}>Severity</label><select id="risk-severity" style={inputStyle} value={riskForm.severity} onChange={e => setRiskForm(p => ({ ...p, severity: e.target.value }))}><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></div>
              <div><label htmlFor="risk-status" style={lbl}>Status</label><select id="risk-status" style={inputStyle} value={riskForm.status} onChange={e => setRiskForm(p => ({ ...p, status: e.target.value }))}><option value="Open">Open</option><option value="Mitigated">Mitigated</option><option value="Closed">Closed</option></select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="risk-owner" style={lbl}>Owner</label><select id="risk-owner" style={inputStyle} value={riskForm.owner} onChange={e => setRiskForm(p => ({ ...p, owner: e.target.value }))}>{TEAM_MEMBERS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label htmlFor="risk-campaign" style={lbl}>Linked Campaign</label><select id="risk-campaign" style={inputStyle} value={riskForm.linkedCampaignId} onChange={e => setRiskForm(p => ({ ...p, linkedCampaignId: e.target.value }))}><option value="">None</option>{campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            </div>
            <div><label htmlFor="risk-mitigation" style={lbl}>Mitigation Plan</label><textarea id="risk-mitigation" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={riskForm.mitigation} onChange={e => setRiskForm(p => ({ ...p, mitigation: e.target.value }))} /></div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={() => setShowRiskModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Risk</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MarketingPlanDashboard;
