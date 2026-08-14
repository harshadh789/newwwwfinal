import React, { useState, useEffect } from 'react';
import { Target, Megaphone, Calendar, DollarSign, Users, Image as ImageIcon, TrendingUp, Briefcase } from 'lucide-react';
import { dataService } from '../../services/MockDataService';

// Tabs
import MarketingPlanDashboard from './MarketingPlanDashboard';
import GoalsAndOKRs from './GoalsAndOKRs';
import CampaignWorkboard from './CampaignWorkboard';
import ContentCalendar from './ContentCalendar';
import BudgetTracker from './BudgetTracker';
import TeamWorkload from './TeamWorkload';
import BrandAssets from './BrandAssets';
import PerformanceInsights from './PerformanceInsights';
import CampaignFormModal from './CampaignFormModal';

const TABS = [
  { id: 'dashboard', label: 'Plan Dashboard', icon: Target },
  { id: 'goals', label: 'Goals & OKRs', icon: TrendingUp },
  { id: 'campaigns', label: 'Campaign Workboard', icon: Megaphone },
  { id: 'content', label: 'Content Calendar', icon: Calendar },
  { id: 'budget', label: 'Budget Tracker', icon: DollarSign },
  { id: 'workload', label: 'Team Workload', icon: Users },
  { id: 'assets', label: 'Brand Assets', icon: ImageIcon },
  { id: 'insights', label: 'Performance Insights', icon: Briefcase }
];

const MarketingStrategy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userRole = 'ADMIN'; // Hardcoded for this prototype iteration, originally from localStorage
  const isAdmin = userRole === 'ADMIN' || userRole === 'MANAGER';

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        tours, company, campaigns, metrics, brandAssets,
        contentPosts, marketingTasks, marketingApprovals,
        goals, milestones, budget, risks
      ] = await Promise.all([
        dataService.getTours(),
        dataService.getCompanyStrategy(),
        dataService.getMarketingCampaigns(),
        dataService.getMarketingMetrics(),
        dataService.getBrandAssets(),
        dataService.getContentPosts(),
        dataService.getMarketingTasks(),
        dataService.getMarketingApprovals(),
        dataService.getMarketingGoals(),
        dataService.getMarketingMilestones(),
        dataService.getMarketingBudget(),
        dataService.getMarketingRisks()
      ]);

      setData({
        tours, company, campaigns, metrics, brandAssets,
        contentPosts, marketingTasks, marketingApprovals,
        goals, milestones, budget, risks
      });
    } catch (err) {
      console.error('Failed to load marketing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Quick campaign form handlers (used across tabs)
  const [editingCamp, setEditingCamp] = useState(null);
  const [showCampModal, setShowCampModal] = useState(false);

  const handleCreateCampaign = () => {
    setEditingCamp(null);
    setShowCampModal(true);
  };

  const handleEditCampaign = (camp) => {
    setEditingCamp(camp);
    setShowCampModal(true);
  };

  const handleSaveCampaign = async (campaignData) => {
    await dataService.saveMarketingCampaign(campaignData);
    setShowCampModal(false);
    setEditingCamp(null);
    loadData();
  };
  
  if (loading || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)' }}>
        Loading Marketing Strategy...
      </div>
    );
  }

  const renderTab = () => {
    const props = { ...data, isAdmin, loadData };
    switch (activeTab) {
      case 'dashboard': return <MarketingPlanDashboard {...props} priorities={data.company?.oneYear?.priorities || []} tasks={data.marketingTasks} approvals={data.marketingApprovals} />;
      case 'goals': return <GoalsAndOKRs {...props} />;
      case 'campaigns': return <CampaignWorkboard {...props} tasks={data.marketingTasks} onCreateCampaign={handleCreateCampaign} onEditCampaign={handleEditCampaign} />;
      case 'content': return <ContentCalendar {...props} posts={data.contentPosts} />;
      case 'budget': return <BudgetTracker {...props} />;
      case 'workload': return <TeamWorkload tasks={data.marketingTasks} campaigns={data.campaigns} />;
      case 'assets': return <BrandAssets assets={data.brandAssets} />;
      case 'insights': return <PerformanceInsights metrics={data.metrics} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Marketing Strategy</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Command center for all campaigns, budgets, assets, and marketing operations.</p>
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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {renderTab()}
        </div>
      </div>

      {showCampModal && (
        <CampaignFormModal
          editingCampaign={editingCamp}
          onClose={() => setShowCampModal(false)}
          onSave={handleSaveCampaign}
        />
      )}

    </div>
  );
};

export default MarketingStrategy;
