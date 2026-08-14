import React, { useState, useEffect } from 'react';
import { Target, Users, LayoutDashboard, MessageCircle, PieChart } from 'lucide-react';
import { dataService } from '../../services/MockDataService';

// Tabs
import SalesDashboard from './SalesDashboard';
import SalesTargets from './SalesTargets';
import FeedbackLoop from './FeedbackLoop';
import CustomerSegments from './CustomerSegments';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'targets', label: 'Targets & Quotas', icon: Target },
  { id: 'feedback', label: 'Marketing Feedback', icon: MessageCircle },
  { id: 'segments', label: 'Customer Segments', icon: PieChart }
];

const SalesStrategy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userRole = 'ADMIN'; // Hardcoded for this prototype
  const isAdmin = userRole === 'ADMIN' || userRole === 'MANAGER';

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        company, tours, targets, feedback, campaigns
      ] = await Promise.all([
        dataService.getCompanyStrategy(),
        dataService.getTours(),
        dataService.getSalesTargets(),
        dataService.getSalesFeedback(),
        dataService.getMarketingCampaigns()
      ]);

      setData({
        company, tours, targets, feedback, campaigns
      });
    } catch (err) {
      console.error('Failed to load sales data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);
  
  if (loading || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)' }}>
        Loading Sales Strategy...
      </div>
    );
  }

  const renderTab = () => {
    const props = { ...data, isAdmin, loadData };
    switch (activeTab) {
      case 'dashboard': return <SalesDashboard {...props} />;
      case 'targets': return <SalesTargets {...props} />;
      case 'feedback': return <FeedbackLoop {...props} />;
      case 'segments': return <CustomerSegments />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Sales Strategy</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Revenue targets, capacity fulfillment, and CRM pipeline.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', overflowX: 'auto', flexShrink: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 0', background: 'none', border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--primary-color)' : 'transparent'}`,
              color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500,
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', height: '100%' }}>
          {renderTab()}
        </div>
      </div>

    </div>
  );
};

export default SalesStrategy;
