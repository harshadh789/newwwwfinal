import React, { useEffect, useState } from 'react';
import { dataService } from '../services/MockDataService';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Target, MapPin, Megaphone, TrendingUp, DollarSign,
  ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Layers, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExecutiveOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [company, plan, tours, campaigns, leads, feedback, scan] = await Promise.all([
          dataService.getCompanyStrategy(),
          dataService.getStrategicPlan(),
          dataService.getTours(),
          dataService.getMarketingCampaigns(),
          dataService.getSalesLeads(),
          dataService.getSalesFeedback(),
          dataService.runDataQualityScan()
        ]);
        setData({ company, plan, tours, campaigns, leads, feedback, scan });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) return <div style={{ padding: '2rem', color: 'var(--text-tertiary)' }}>Loading Executive Cockpit...</div>;

  const { company, tours, campaigns, leads, feedback, scan } = data;

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  // Aggregate live metrics
  const totalLeads = feedback.reduce((sum, f) => sum + (Number(f.totalLeads) || 0), 0);
  const potentialLeads = feedback.reduce((sum, f) => sum + (Number(f.potentialLeads) || 0), 0);
  const wonLeads = leads.filter(l => l.stage === 'Won');
  const actualClosedRev = wonLeads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Executive Operating Cockpit</h1>
            <span style={{ fontSize: '0.72rem', background: 'linear-gradient(135deg, #3B82F630, #8B5CF630)', color: '#93C5FD', border: '1px solid #3B82F650', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
              Version 3.0 Live Sync
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.3rem 0 0' }}>
            Single source of truth uniting Strategy, Operations, Marketing, Sales, and Finance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '0.4rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: '#34D399',
            fontWeight: 600
          }}>
            <ShieldCheck size={16} />
            <span>System Integrity: {scan?.overallScore || 94}%</span>
          </div>
        </div>
      </div>

      {/* 4 Connected Pillar KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        
        {/* Operations Pillar */}
        <div className="card" onClick={() => navigate('/tours/planning')} style={{ padding: '1.25rem', borderLeft: '4px solid #3B82F6', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 700 }}>
            <span>OPERATIONS ENGINE</span>
            <Briefcase size={15} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '0.4rem 0 0.2rem' }}>
            {tours.length} Tours
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {tours.filter(t => t.lifecycleStage === 'EXECUTE').length} Live in Execution • {tours.filter(t => t.lifecycleStage === 'PLAN' || t.lifecycleStage === 'CREATE').length} Planned
          </div>
        </div>

        {/* Marketing Pillar */}
        <div className="card" onClick={() => navigate('/marketing-strategy')} style={{ padding: '1.25rem', borderLeft: '4px solid #EC4899', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#EC4899', fontSize: '0.75rem', fontWeight: 700 }}>
            <span>MARKETING DEMAND</span>
            <Megaphone size={15} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '0.4rem 0 0.2rem' }}>
            {campaigns.length} Campaigns
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {totalLeads} Total Inquiries • {potentialLeads} Pre-Qualified
          </div>
        </div>

        {/* Sales Pillar */}
        <div className="card" onClick={() => navigate('/sales-strategy')} style={{ padding: '1.25rem', borderLeft: '4px solid #10B981', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#10B981', fontSize: '0.75rem', fontWeight: 700 }}>
            <span>SALES PIPELINE</span>
            <TrendingUp size={15} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '0.4rem 0 0.2rem' }}>
            {leads.length} Opportunities
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {wonLeads.length} Deals Won • {leads.filter(l => l.stage !== 'Won' && l.stage !== 'Lost').length} Active in Negotiation
          </div>
        </div>

        {/* Finance Pillar */}
        <div className="card" onClick={() => navigate('/finance-planning')} style={{ padding: '1.25rem', borderLeft: '4px solid #F59E0B', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#F59E0B', fontSize: '0.75rem', fontWeight: 700 }}>
            <span>FINANCE ACTUALS</span>
            <DollarSign size={15} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', margin: '0.4rem 0 0.2rem' }}>
            {formatINR(actualClosedRev || 1200000)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Realized Closed Revenue (Won Deals)
          </div>
        </div>

      </div>

      {/* Strategic North Star */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            Vision Statement
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            {company?.vision || "To be the most trusted global travel transformation company, delivering unparalleled premium FIT experiences."}
          </p>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A78BFA', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            Mission Statement
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            {company?.mission || "Executing flawless travel operations so our customers experience the true magic of the destination."}
          </p>
        </div>
      </div>

      {/* Cross-Department Alignment Quick Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Live Tour Alignment & Department Status</h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Real-time progress overview across all 4 departments for key tours.
            </p>
          </div>
          <button
            onClick={() => navigate('/alignment-matrix')}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', gap: '4px' }}
          >
            Full Alignment Matrix <ArrowRight size={13} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>Tour Product</th>
                <th style={{ padding: '0.75rem' }}>Month</th>
                <th style={{ padding: '0.75rem' }}>Operations</th>
                <th style={{ padding: '0.75rem' }}>Marketing</th>
                <th style={{ padding: '0.75rem' }}>Sales</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Target Revenue</th>
              </tr>
            </thead>
            <tbody>
              {tours.slice(0, 4).map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#fff' }}>{t.name}</td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA' }}>{t.travelMonth}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#60A5FA', fontWeight: 700 }}>
                      {t.lifecycleStage || 'PLAN'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#EC4899', fontWeight: 600 }}>
                    {t.marketingNeeds?.creativesRequired || 4} Creatives Needed
                  </td>
                  <td style={{ padding: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                    {t.sales?.targetCustomers || 20} Pax Target
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 700, color: '#FCD34D' }}>
                    {formatINR(t.finance?.plannedRevenue || 1000000)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ExecutiveOverview;
