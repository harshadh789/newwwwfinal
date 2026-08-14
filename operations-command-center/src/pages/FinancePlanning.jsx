import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, DollarSign, Activity, FileText, Sliders, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { dataService } from '../services/MockDataService';
import { useNavigate } from 'react-router-dom';

const FinancePlanning = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tours, campaigns, salesLeads, salesFeedback, systemSettings] = await Promise.all([
        dataService.getTours(),
        dataService.getMarketingCampaigns(),
        dataService.getSalesLeads(),
        dataService.getSalesFeedback(),
        dataService.getSystemSettings()
      ]);
      setData({ tours, campaigns, salesLeads, salesFeedback, settings: systemSettings });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !data) {
    return <div style={{ padding: '2rem', color: 'var(--text-tertiary)' }}>Loading Consolidated Financial Data...</div>;
  }

  const { settings } = data;
  const convRate = settings?.forecastConversionRate || 0.30;
  const avgTicket = settings?.avgTicketSize || 100000;
  const marginPct = (settings?.defaultProfitMargin || 25) / 100;

  // 1. Calculate Campaign Forecasts (Top of funnel - Sales Feedback)
  const campaignForecasts = data.campaigns.map(camp => {
    const feedback = data.salesFeedback.filter(f => f.campaignId === camp.id);
    const totalLeads = feedback.reduce((sum, f) => sum + (Number(f.totalLeads) || 0), 0);
    const potentialLeads = feedback.reduce((sum, f) => sum + (Number(f.potentialLeads) || 0), 0);
    
    // Dynamic Admin settings logic: e.g. 10 potential leads * 30% = 3 closures * avgTicket
    const expectedClosures = Math.round(potentialLeads * convRate);
    const projectedRevenue = expectedClosures * avgTicket;
    const projectedProfit = projectedRevenue * marginPct;

    return {
      ...camp,
      totalLeads,
      potentialLeads,
      expectedClosures,
      projectedRevenue,
      projectedProfit
    };
  });

  // 2. Calculate Tour Forecasts & Actuals (Pipeline & Bottom of funnel)
  const tourFinancials = data.tours.map(tour => {
    const leads = data.salesLeads.filter(l => l.tourId === tour.id);
    
    const activeLeads = leads.filter(l => l.stage !== 'Won' && l.stage !== 'Lost');
    const expectedPipelineClosures = activeLeads.reduce((sum, l) => sum + (l.probability / 100), 0);
    const projectedPipelineRevenue = activeLeads.reduce((sum, l) => sum + (l.value * (l.probability / 100)), 0);
    const projectedPipelineProfit = projectedPipelineRevenue * marginPct;
    
    const wonLeads = leads.filter(l => l.stage === 'Won');
    const actualClosures = wonLeads.length;
    const actualRevenue = wonLeads.reduce((sum, l) => sum + l.value, 0);
    const actualProfit = actualRevenue * marginPct;

    const feedback = data.salesFeedback.filter(f => f.campaignId === tour.id);
    const manualClosedRevenue = feedback.reduce((sum, f) => sum + (Number(f.closedRevenue) || 0), 0);
    const manualClosedProfit = feedback.reduce((sum, f) => sum + (Number(f.closedProfit) || 0), 0);
    const manualClosings = feedback.reduce((sum, f) => sum + (Number(f.dailyClosing) || 0), 0);

    return {
      ...tour,
      expectedPipelineClosures: expectedPipelineClosures.toFixed(1),
      projectedPipelineRevenue,
      projectedPipelineProfit,
      actualClosures: actualClosures + manualClosings,
      actualRevenue: actualRevenue + manualClosedRevenue,
      actualProfit: actualProfit + manualClosedProfit,
    };
  });

  // Rollup Totals
  const totalEarlyRevenue = campaignForecasts.reduce((s, c) => s + c.projectedRevenue, 0);
  const totalEarlyProfit = campaignForecasts.reduce((s, c) => s + c.projectedProfit, 0);
  const totalPipelineRevenue = tourFinancials.reduce((s, t) => s + t.projectedPipelineRevenue, 0);
  const totalPipelineProfit = tourFinancials.reduce((s, t) => s + t.projectedPipelineProfit, 0);
  const totalActualRevenue = tourFinancials.reduce((s, t) => s + t.actualRevenue, 0);
  const totalActualProfit = tourFinancials.reduce((s, t) => s + t.actualProfit, 0);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Finance Module</h1>
            <span style={{ fontSize: '0.72rem', background: '#10B98120', color: '#34D399', border: '1px solid #10B98140', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
              Live Auto-Consolidation
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Unified real-time consolidation from Marketing campaigns, Sales feedback, Sales pipeline, and Operations costs.
          </p>
        </div>

        {/* Active Engine Calibration Badge */}
        <button
          onClick={() => navigate('/admin')}
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            padding: '0.4rem 0.75rem',
            color: '#93C5FD',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
          title="Click to configure forecast settings in Admin Center"
        >
          <Sliders size={14} />
          <span>Formula: <strong>{Math.round(convRate * 100)}% Conv</strong> • <strong>{formatINR(avgTicket)}</strong> Ticket • <strong>{Math.round(marginPct * 100)}%</strong> Margin</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Rollup KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          
          {/* Early Stage Forecast */}
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #60A5FA' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>
              1. EARLY STAGE (CAMPAIGNS)
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0.3rem 0 0.2rem' }}>
              {formatINR(totalEarlyRevenue)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
              {formatINR(totalEarlyProfit)} Projected Profit
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
              From Sales Daily Feedback potential leads
            </span>
          </div>

          {/* Pipeline Mid/Late Stage */}
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #818CF8' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>
              2. PIPELINE (PROBABILITY WEIGHTED)
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0.3rem 0 0.2rem' }}>
              {formatINR(totalPipelineRevenue)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
              {formatINR(totalPipelineProfit)} Expected Profit
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
              From active Sales Opportunities & deal stages
            </span>
          </div>

          {/* Actuals Won */}
          <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>
              3. ACTUAL CLOSED REVENUE
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', margin: '0.3rem 0 0.2rem' }}>
              {formatINR(totalActualRevenue)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#34D399', fontWeight: 700 }}>
              {formatINR(totalActualProfit)} Realized Profit
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
              From Won deals & verified feedback closures
            </span>
          </div>

        </div>

        {/* 1. Marketing Campaign Forecasts Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#60A5FA' }}>
                <TrendingUp size={17} /> Marketing Campaign Forecasts (Early Stage)
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                Formula: Potential Leads × {Math.round(convRate * 100)}% Conversion × {formatINR(avgTicket)} Ticket Size → Projected Profit ({Math.round(marginPct * 100)}% Margin).
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '0.9rem 1rem' }}>Campaign</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Total Leads</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Potential Leads</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Exp. Closures</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Projected Revenue</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Projected Profit</th>
                </tr>
              </thead>
              <tbody>
                {campaignForecasts.map(camp => (
                  <tr key={camp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>{camp.name}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>{camp.totalLeads}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: camp.potentialLeads > 0 ? '#34D399' : 'inherit', fontWeight: 700 }}>
                      {camp.potentialLeads}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', fontWeight: 700, color: '#60A5FA' }}>
                      {camp.expectedClosures}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontWeight: 600 }}>{formatINR(camp.projectedRevenue)}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', color: '#10B981', fontWeight: 700 }}>{formatINR(camp.projectedProfit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Tour Pipeline & Actuals Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#818CF8' }}>
                <DollarSign size={17} /> Tour Pipeline & Actuals (Mid / Late Stage)
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                Aggregated from Sales Pipeline Opportunities (Probability Weighted) vs. Won Deals & Feedback closures.
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '0.9rem 1rem' }}>Tour Product</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Exp. Pipeline Closures</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Projected Revenue</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Actual Closed Deals</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Actual Revenue</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Actual Profit</th>
                </tr>
              </thead>
              <tbody>
                {tourFinancials.map(tour => (
                  <tr key={tour.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>{tour.name}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#818CF8', fontWeight: 600 }}>{tour.expectedPipelineClosures}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>{formatINR(tour.projectedPipelineRevenue)}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', fontWeight: 700, color: tour.actualClosures > 0 ? '#34D399' : 'inherit' }}>
                      {tour.actualClosures}
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(tour.actualRevenue)}</td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right', color: '#10B981', fontWeight: 800 }}>{formatINR(tour.actualProfit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FinancePlanning;
