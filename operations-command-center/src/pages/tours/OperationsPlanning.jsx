import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { CheckSquare, Calendar, Users, IndianRupee, AlertCircle, Briefcase, Plus, MapPin, Edit, Trash2 } from 'lucide-react';
import OperationsPlanEditor from './OperationsPlanEditor';

const OperationsPlanning = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [tours, setTours] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allPlans = await dataService.getOperationsPlans();
    const allTours = await dataService.getTours();
    
    // We also need to get Confirmed Tours because they are part of the operations plan
    const confirmed = await dataService.getConfirmedTours();
    
    // Merge them into one planning view, filtering out ARCHIVED plans
    const combinedPlans = [
      ...confirmed.map(c => ({ ...c, isConfirmed: true, status: 'Confirmed' })),
      ...(allPlans || []).filter(p => p.status !== 'ARCHIVED')
    ];

    setPlans(combinedPlans);
    setTours(allTours || []);
  };

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(user?.role);

  const getDaysDiff = (dateStr) => {
    if (!dateStr) return 999;
    const d = new Date(dateStr);
    return Math.floor((d - new Date()) / (1000 * 60 * 60 * 24));
  };

  const getHorizonLabel = (days) => {
    if (days <= 30) return 'Next 30 Days';
    if (days <= 60) return '31–60 Days';
    if (days <= 90) return '61–90 Days';
    if (days <= 180) return '3–6 Months';
    return '6–12 Months';
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setIsEditorOpen(true);
  };

  const handleArchivePlan = async (plan) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      await dataService.saveOperationsPlan({ ...plan, status: 'ARCHIVED' });
      loadData();
    }
  };

  const grouped = {
    Confirmed: plans.filter(p => p.status === 'Confirmed'),
    Expected: plans.filter(p => p.status === 'Expected'),
    Proposed: plans.filter(p => p.status === 'Proposed')
  };

  const PlanCard = ({ plan }) => {
    const tourInfo = tours.find(t => t.id === plan.tourId) || {};
    const horizon = getHorizonLabel(getDaysDiff(plan.departureDate));
    
    return (
      <div className="card" style={{ marginBottom: '1rem', borderLeft: `4px solid ${plan.status === 'Confirmed' ? 'var(--success-color)' : plan.status === 'Expected' ? 'var(--primary-color)' : 'var(--warning-color)'}` }}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{tourInfo.name || 'Unknown Tour'}</h4>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'var(--surface-color)', borderRadius: '4px', fontWeight: 600 }}>{horizon}</span>
          </div>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {tourInfo.destination}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Travel Period</div>
              <div style={{ fontWeight: 500 }}>
                {plan.departureDate ? new Date(plan.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'TBD'}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Volume</div>
              <div style={{ fontWeight: 500 }}>{plan.expectedCustomers || '?'} Pax</div>
            </div>
          </div>
          
          <div style={{ padding: '0.75rem', background: 'var(--bg-color)', borderRadius: '4px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Revenue</span>
              <span style={{ fontWeight: 600 }}>₹{plan.expectedRevenue?.toLocaleString() || '0'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Production</span>
              <span style={{ fontWeight: 600 }}>₹{plan.expectedProduction?.toLocaleString() || '0'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Profit</span>
              <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>₹{plan.expectedProfit?.toLocaleString() || '0'}</span>
            </div>
          </div>
          
          {plan.operationsNotes && (
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: '2px solid var(--border-color)', paddingLeft: '0.5rem' }}>
              {plan.operationsNotes}
            </div>
          )}
          
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}>
              View Full Details
            </button>
            {isOpsOrAdmin && plan.status !== 'Confirmed' && (
              <>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '0.5rem', width: 'auto' }}
                  onClick={() => handleEditPlan(plan)}
                >
                  <Edit size={16} />
                </button>
                <button 
                  style={{ padding: '0.5rem', width: 'auto', color: 'var(--danger-color)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => handleArchivePlan(plan)}
                  title="Archive Plan"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToursLayout 
      title="Operations Planning" 
      subtitle="What upcoming tours should Operations prepare for? Data-driven preparation and financial outlook."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <p className="text-secondary" style={{ margin: 0, fontStyle: 'italic' }}>
          This is a business-readiness indicator, NOT a task management system.
        </p>
        {isOpsOrAdmin && (
          <button className="btn btn-primary" onClick={() => { setEditingPlan(null); setIsEditorOpen(true); }}>
            <Plus size={18} /> Add Tour Plan
          </button>
        )}
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* CONFIRMED */}
        <div>
          <h3 style={{ borderBottom: '2px solid var(--success-color)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>CONFIRMED</span>
            <span style={{ background: 'var(--bg-color)', padding: '0 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{grouped.Confirmed.length}</span>
          </h3>
          {grouped.Confirmed.length === 0 ? (
            <div className="empty-state" style={{ padding: '1rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <span className="text-secondary">No confirmed tours.</span>
            </div>
          ) : (
            grouped.Confirmed.map(plan => <PlanCard key={plan.id} plan={plan} />)
          )}
        </div>

        {/* EXPECTED */}
        <div>
          <h3 style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>EXPECTED</span>
            <span style={{ background: 'var(--bg-color)', padding: '0 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{grouped.Expected.length}</span>
          </h3>
          {grouped.Expected.length === 0 ? (
            <div className="empty-state" style={{ padding: '1rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <span className="text-secondary">No expected tours configured.</span>
            </div>
          ) : (
            grouped.Expected.map(plan => <PlanCard key={plan.id} plan={plan} />)
          )}
        </div>

        {/* PROPOSED */}
        <div>
          <h3 style={{ borderBottom: '2px solid var(--warning-color)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>PROPOSED</span>
            <span style={{ background: 'var(--bg-color)', padding: '0 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{grouped.Proposed.length}</span>
          </h3>
          {grouped.Proposed.length === 0 ? (
            <div className="empty-state" style={{ padding: '1rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <span className="text-secondary">No proposed tours configured.</span>
            </div>
          ) : (
            grouped.Proposed.map(plan => <PlanCard key={plan.id} plan={plan} />)
          )}
        </div>
      </div>

      {isEditorOpen && (
        <OperationsPlanEditor 
          plan={editingPlan}
          tours={tours}
          onClose={() => setIsEditorOpen(false)}
          onRefresh={loadData}
        />
      )}
    </ToursLayout>
  );
};

export default OperationsPlanning;
