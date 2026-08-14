import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, TrendingUp, Users, Calendar } from 'lucide-react';
import QuickStatCard from '../marketing/components/QuickStatCard';
import { formatINR } from './constants';

const SalesDashboard = ({ company, tours, targets }) => {
  const totalTargetCustomers = tours.reduce((sum, tour) => sum + (tour.sales?.targetCustomers || 0), 0);
  const totalTargetRevenue = tours.reduce((sum, tour) => sum + (tour.finance?.plannedRevenue || 0), 0);
  const achievedRevenue = targets.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.achieved, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* High-Level Targets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <QuickStatCard icon={Target} label="Total Target Customers" value={totalTargetCustomers} color="#3B82F6" />
        <QuickStatCard icon={TrendingUp} label="Total Target Revenue" value={formatINR(totalTargetRevenue)} color="#10B981" />
        <QuickStatCard icon={TrendingUp} label="Total Achieved Revenue" value={formatINR(achievedRevenue)} color="#818CF8" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        
        {/* Sales Focus Timeline */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} color="#818CF8"/> Sales Focus Timeline</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Tour</th>
                <th style={{ padding: '0.75rem' }}>Sales Focus Window</th>
                <th style={{ padding: '0.75rem' }}>Travel Month</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Target Cust.</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => (
                <tr key={tour.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <NavLink to={`/tour-strategy/${tour.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
                      {tour.name}
                    </NavLink>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {tour.sales?.focusStart || 'TBD'} – {tour.sales?.focusEnd || 'TBD'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{tour.travelMonth}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 700, color: '#10B981', fontSize: '0.9rem' }}>{tour.sales?.targetCustomers || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Company Direction */}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Strategic Direction</h2>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.25rem' }}>1-Year Objective</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{company.oneYear?.salesDirection || 'Not defined'}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.25rem' }}>Q3 Focus</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{company.threeMonth?.salesDirection || 'Not defined'}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.25rem' }}>August Focus</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{company.oneMonth?.salesDirection || 'Not defined'}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SalesDashboard;
