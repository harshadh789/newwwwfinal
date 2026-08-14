import React, { useState, useEffect } from 'react';
import { dataService } from '../services/MockDataService';
import { AlignJustify, CheckCircle2, Megaphone, TrendingUp, Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlignmentMatrix = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [allTours, allCampaigns] = await Promise.all([
        dataService.getTours(),
        dataService.getMarketingCampaigns()
      ]);
      setTours(allTours || []);
      setCampaigns(allCampaigns || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-tertiary)' }}>Loading Alignment Matrix...</div>;

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Company Alignment Matrix</h1>
            <span style={{ fontSize: '0.72rem', background: '#3B82F620', color: '#60A5FA', border: '1px solid #3B82F640', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
              Cross-Department Sync
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Live departmental handovers & synchronized progress for every tour across Operations, Marketing, Sales, and Finance.
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Tour Product</th>
                  <th style={{ padding: '1rem' }}>Travel Period</th>
                  <th style={{ padding: '1rem', color: '#60A5FA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> Operations Lifecycle</div>
                  </th>
                  <th style={{ padding: '1rem', color: '#EC4899' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Megaphone size={14} /> Marketing Demand</div>
                  </th>
                  <th style={{ padding: '1rem', color: '#10B981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} /> Sales Readiness</div>
                  </th>
                  <th style={{ padding: '1rem', color: '#F59E0B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> Finance P&L Target</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours.map(tour => {
                  const hasCamp = campaigns.some(c => c.name.toLowerCase().includes(tour.name.toLowerCase()) || c.id === tour.id);
                  const stage = tour.lifecycleStage || 'PLAN';

                  return (
                    <tr key={tour.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      
                      {/* Tour Product */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{tour.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{tour.destination} • {tour.category || 'FIT'}</div>
                      </td>

                      {/* Travel Month */}
                      <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#60A5FA' }}>{tour.travelMonth} 2026</span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{tour.season} Season</div>
                      </td>

                      {/* Operations */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: stage === 'EXECUTE' ? 'rgba(16, 185, 129, 0.15)' : (stage === 'CREATE' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)'),
                          color: stage === 'EXECUTE' ? '#34D399' : (stage === 'CREATE' ? '#FBBF24' : '#60A5FA'),
                          border: `1px solid ${stage === 'EXECUTE' ? '#10B98140' : (stage === 'CREATE' ? '#F59E0B40' : '#3B82F640')}`
                        }}>
                          {stage} STAGE
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                          Cap: {tour.sales?.targetCustomers || 20} Guests
                        </div>
                      </td>

                      {/* Marketing */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.78rem', color: '#EC4899', fontWeight: 600 }}>
                          {tour.marketingNeeds?.creativesRequired || 4} Creatives Needed
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                          Budget: {formatINR(tour.marketingNeeds?.estimatedBudget || 100000)}
                        </div>
                        <span style={{ fontSize: '0.7rem', color: hasCamp ? '#34D399' : '#F59E0B', fontWeight: 600 }}>
                          {hasCamp ? '✓ Campaign Live' : '⏳ Campaign Planned'}
                        </span>
                      </td>

                      {/* Sales */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
                          {formatINR(tour.salesBriefing?.minPrice || 35000)} / Pax
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                          Target: {formatINR(tour.finance?.plannedRevenue || 1000000)}
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#34D399', fontWeight: 600 }}>
                          ✓ USPs Briefed
                        </span>
                      </td>

                      {/* Finance */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FCD34D' }}>
                          {formatINR(tour.finance?.plannedProfit || 400000)} Profit
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                          Planned Margin: {tour.finance?.plannedMargin || 35}%
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AlignmentMatrix;
