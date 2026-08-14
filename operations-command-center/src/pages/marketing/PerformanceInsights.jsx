import React, { useState } from 'react';
import { TrendingUp, Users, Target, MousePointer, DollarSign } from 'lucide-react';
import QuickStatCard from './components/QuickStatCard';
import FilterBar from './components/FilterBar';
import { FUNNEL_CATEGORIES, ALL_CHANNELS, formatINR } from './constants';

const PerformanceInsights = ({ metrics }) => {
  const [funnelFilter, setFunnelFilter] = useState('ALL');
  const [channelFilter, setChannelFilter] = useState('ALL');

  const filtered = metrics.filter(m => {
    if (funnelFilter !== 'ALL' && m.funnelCategory !== funnelFilter) return false;
    if (channelFilter !== 'ALL' && m.channel !== channelFilter) return false;
    return true;
  });

  const totalReach = filtered.reduce((s, m) => s + (m.reachCount || 0), 0);
  const totalLeads = filtered.reduce((s, m) => s + (m.leadCount || 0), 0);
  const totalSpend = filtered.reduce((s, m) => s + (m.spendINR || 0), 0);
  const cpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const convRate = totalReach > 0 ? (totalLeads / totalReach) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <FilterBar
        filters={[
          { id: 'pi-funnel', label: 'Funnel Stage', value: funnelFilter, onChange: setFunnelFilter, options: FUNNEL_CATEGORIES.map(f => ({ value: f.value, label: f.label })) },
          { id: 'pi-channel', label: 'Channel', value: channelFilter, onChange: setChannelFilter, options: ALL_CHANNELS.map(c => ({ value: c, label: c })) },
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <QuickStatCard icon={Users} label="Total Reach / Impr." value={totalReach.toLocaleString()} color="#818CF8" />
        <QuickStatCard icon={Target} label="Total Leads / Clicks" value={totalLeads.toLocaleString()} color="#10B981" />
        <QuickStatCard icon={DollarSign} label="Total Spend" value={formatINR(totalSpend)} color="#F59E0B" />
        <QuickStatCard icon={TrendingUp} label="Avg CPL (Cost Per Lead)" value={formatINR(cpl)} color={cpl > 200 ? '#EF4444' : '#10B981'} />
        <QuickStatCard icon={MousePointer} label="Conv. Rate" value={`${convRate.toFixed(2)}%`} color="#EC4899" />
      </div>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric Name</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Channel</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stage</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reach</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spend</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CPL</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No metrics data available for this selection.</td></tr>}
            {filtered.map(m => {
              const itemCpl = m.leadCount > 0 ? m.spendINR / m.leadCount : 0;
              const fc = FUNNEL_CATEGORIES.find(f => f.value === m.funnelCategory) || FUNNEL_CATEGORIES[0];
              return (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    {m.metricName}
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 400, marginTop: '0.15rem' }}>{m.notes}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem' }}>{m.channel}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem' }}><span style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', background: fc.bg, color: fc.color, fontSize: '0.7rem', fontWeight: 700 }}>{fc.label}</span></td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600 }}>{(m.reachCount || 0).toLocaleString()}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: '#10B981' }}>{(m.leadCount || 0).toLocaleString()}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', color: '#F59E0B' }}>{formatINR(m.spendINR)}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: itemCpl > 200 ? '#EF4444' : '#10B981' }}>{formatINR(itemCpl)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceInsights;
