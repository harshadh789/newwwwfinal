import React, { useState, useMemo } from 'react';
import { Calendar, Filter, Target, Star, AlertCircle, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import StatusBadge from '../marketing/components/StatusBadge';
import OwnerAvatar from '../marketing/components/OwnerAvatar';
import { FEEDBACK_STATUS } from './constants';
import { TEAM_MEMBERS } from '../marketing/constants';

const FeedbackReports = ({ feedback, campaigns }) => {
  const [dateRange, setDateRange] = useState('30');
  const [campaignFilter, setCampaignFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ownerFilter, setOwnerFilter] = useState('ALL');

  // Filter feedback
  const filteredFeedback = useMemo(() => {
    const now = new Date();
    const rangeDate = new Date();
    rangeDate.setDate(now.getDate() - parseInt(dateRange));

    return (feedback || []).filter(f => {
      const fDate = new Date(f.date);
      if (dateRange !== 'ALL' && fDate < rangeDate) return false;
      if (campaignFilter !== 'ALL' && f.campaignId !== campaignFilter) return false;
      if (statusFilter !== 'ALL' && f.status !== statusFilter) return false;
      if (ownerFilter !== 'ALL' && f.owner !== ownerFilter) return false;
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [feedback, dateRange, campaignFilter, statusFilter, ownerFilter]);

  // Calculate Metrics
  const metrics = useMemo(() => {
    const total = filteredFeedback.length;
    const avgQuality = total ? (filteredFeedback.reduce((sum, f) => sum + f.leadQuality, 0) / total).toFixed(1) : 0;
    const pendingActions = filteredFeedback.filter(f => f.status !== 'Closed').length;
    const highPriority = filteredFeedback.filter(f => f.priority === 'High' || f.leadQuality <= 2).length;
    return { total, avgQuality, pendingActions, highPriority };
  }, [filteredFeedback]);

  // Chart Data (Group by Date)
  const chartData = useMemo(() => {
    const grouped = {};
    filteredFeedback.forEach(f => {
      if (!grouped[f.date]) grouped[f.date] = { count: 0, qualitySum: 0 };
      grouped[f.date].count += 1;
      grouped[f.date].qualitySum += f.leadQuality;
    });
    
    return Object.entries(grouped)
      .sort((a, b) => new Date(a[0]) - new Date(b[0])) // oldest to newest for chart
      .map(([date, data]) => ({
        date,
        avgQuality: data.qualitySum / data.count,
        count: data.count
      }))
      .slice(-14); // Show last 14 days maximum to avoid crowding
  }, [filteredFeedback]);

  // Render Stars
  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 800, marginRight: '4px', color: 'var(--text-primary)' }}>{rating}</span>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={14} fill={star <= Math.round(rating) ? '#F59E0B' : 'transparent'} color={star <= Math.round(rating) ? '#F59E0B' : 'var(--border-color)'} />
        ))}
      </div>
    );
  };

  const getCampaignName = (id) => campaigns?.find(c => c.id === id)?.name || 'Unknown Campaign';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', background: 'var(--card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <Filter size={16} /> <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Report Filters:</span>
        </div>
        
        <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ padding: '0.4rem 0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="ALL">All Time</option>
        </select>

        <select value={campaignFilter} onChange={e => setCampaignFilter(e.target.value)} style={{ padding: '0.4rem 0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
          <option value="ALL">All Campaigns</option>
          {campaigns?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.4rem 0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
          <option value="ALL">All Statuses</option>
          {FEEDBACK_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        
        <select value={ownerFilter} onChange={e => setOwnerFilter(e.target.value)} style={{ padding: '0.4rem 0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.8rem' }}>
          <option value="ALL">All Owners</option>
          {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Feedback Logged</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.total}</div>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avg Lead Quality</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: metrics.avgQuality >= 3.5 ? '#10B981' : metrics.avgQuality >= 2.5 ? '#F59E0B' : '#EF4444' }}>{metrics.avgQuality} <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)' }}>/ 5</span></div>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', borderBottom: metrics.pendingActions > 0 ? '3px solid #3B82F6' : '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={14} color="#3B82F6" /> Pending Actions</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.pendingActions}</div>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', borderBottom: metrics.highPriority > 0 ? '3px solid #EF4444' : '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><AlertCircle size={14} color="#EF4444" /> Critical Issues (HQ)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.highPriority}</div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        
        {/* Chart Column */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart2 size={18} color="var(--primary-color)" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Lead Quality Trend (Last 14 Log Days)</h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '200px', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            {/* Y-Axis lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.05)', height: '1px' }}></div>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.05)', height: '1px' }}></div>
            
            {chartData.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-tertiary)', alignSelf: 'center' }}>No trend data available for this period.</div>
            ) : (
              chartData.map((d, i) => {
                const heightPercent = (d.avgQuality / 5) * 100;
                const color = d.avgQuality >= 3.5 ? '#10B981' : d.avgQuality >= 2.5 ? '#F59E0B' : '#EF4444';
                return (
                  <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', zIndex: 1, position: 'relative' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>{d.avgQuality.toFixed(1)}</div>
                    <div style={{ width: '100%', maxWidth: '32px', height: `${heightPercent}%`, minHeight: '4px', background: color, borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'height 0.3s' }}></div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', position: 'absolute', bottom: '-1.25rem', transform: 'rotate(-45deg)', transformOrigin: 'top left' }}>
                      {d.date.substring(5)}
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}></div> High (3.5+)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }}></div> Medium (2.5 - 3.4)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}></div> Low (&lt; 2.5)</span>
          </div>
        </div>

        {/* Action Plan Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="#3B82F6" /> Pending Action Plans
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto', maxHeight: '400px', paddingRight: '0.5rem' }}>
              {filteredFeedback.filter(f => f.status !== 'Closed').length === 0 ? (
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>All caught up! No pending actions.</div>
              ) : (
                filteredFeedback.filter(f => f.status !== 'Closed').map(f => (
                  <div key={f.id} style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{getCampaignName(f.campaignId)}</div>
                      <StatusBadge status={f.status} small />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                      {f.actionPlan || <span style={{ fontStyle: 'italic', color: 'var(--text-tertiary)' }}>No action plan specified.</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Owner:</span>
                        <OwnerAvatar name={f.owner} size={20} showName={false} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{f.owner}</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Date: {f.date}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FeedbackReports;
