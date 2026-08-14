import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, DollarSign, Activity, FileText } from 'lucide-react';
import { dataService } from '../services/MockDataService';

const FinancePlanning = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tours, campaigns, salesLeads, salesFeedback] = await Promise.all([
        dataService.getTours(),
        dataService.getMarketingCampaigns(),
        dataService.getSalesLeads(),
        dataService.getSalesFeedback()
      ]);
      setData({ tours, campaigns, salesLeads, salesFeedback });
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
    return <div style={{ padding: '2rem', color: 'var(--text-tertiary)' }}>Loading Finance Data...</div>;
  }

  // Calculate Campaign Forecasts (Top of funnel)
  const campaignForecasts = data.campaigns.map(camp => {
    const feedback = data.salesFeedback.filter(f => f.campaignId === camp.id);
    const totalLeads = feedback.reduce((sum, f) => sum + (Number(f.totalLeads) || 0), 0);
    const potentialLeads = feedback.reduce((sum, f) => sum + (Number(f.potentialLeads) || 0), 0);
    
    // Logic: 30% conversion on potential leads, avg ticket 1,00,000, 25% margin
    const expectedClosures = Math.round(potentialLeads * 0.30);
    const projectedRevenue = expectedClosures * 100000;
    const projectedProfit = projectedRevenue * 0.25;

    return {
      ...camp,
      totalLeads,
      potentialLeads,
      expectedClosures,
      projectedRevenue,
      projectedProfit
    };
  });

  // Calculate Tour Forecasts & Actuals (Pipeline & Bottom of funnel)
  const tourFinancials = data.tours.map(tour => {
    const leads = data.salesLeads.filter(l => l.tourId === tour.id);
    
    const activeLeads = leads.filter(l => l.stage !== 'Won' && l.stage !== 'Lost');
    const expectedPipelineClosures = activeLeads.reduce((sum, l) => sum + (l.probability / 100), 0);
    const projectedPipelineRevenue = activeLeads.reduce((sum, l) => sum + (l.value * (l.probability / 100)), 0);
    const projectedPipelineProfit = projectedPipelineRevenue * 0.25; // Assume 25% margin
    
    const wonLeads = leads.filter(l => l.stage === 'Won');
    const actualClosures = wonLeads.length;
    const actualRevenue = wonLeads.reduce((sum, l) => sum + l.value, 0);
    const actualProfit = actualRevenue * 0.25;

    // Add any manual closing data from feedback if the campaign is actually a tour
    // For simplicity, we just use the tour's own feedback if campaignId == tourId
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

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Finance Module</h1>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Automatically consolidated from Marketing & Sales data.
        </p>
      </div>

      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Campaign Forecasts Section */}
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
            <TrendingUp size={18} /> Marketing Campaign Forecasts (Early Stage)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>
            Calculated from Daily Sales Feedback: Potential Leads × 30% Historical Conversion Rate.
          </p>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Campaign</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Total Leads</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Potential Leads</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Expected Closures</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Projected Revenue</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Projected Profit</th>
                </tr>
              </thead>
              <tbody>
                {campaignForecasts.map(camp => (
                  <tr key={camp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{camp.name}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{camp.totalLeads}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: camp.potentialLeads > 0 ? '#34D399' : 'inherit' }}>{camp.potentialLeads}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{camp.expectedClosures}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>{formatINR(camp.projectedRevenue)}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#10B981' }}>{formatINR(camp.projectedProfit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tour Pipeline & Actuals Section */}
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#818CF8' }}>
            <DollarSign size={18} /> Tour Pipeline & Actuals (Mid / Late Stage)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>
            Aggregated from Active Sales Opportunities and Won Deals.
          </p>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Tour</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Exp. Pipeline Closures</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Projected Revenue</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Actual Closed Deals</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actual Revenue</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actual Profit</th>
                </tr>
              </thead>
              <tbody>
                {tourFinancials.map(tour => (
                  <tr key={tour.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{tour.name}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{tour.expectedPipelineClosures}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>{formatINR(tour.projectedPipelineRevenue)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: tour.actualClosures > 0 ? '#34D399' : 'inherit' }}>{tour.actualClosures}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>{formatINR(tour.actualRevenue)}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#10B981', fontWeight: 700 }}>{formatINR(tour.actualProfit)}</td>
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
