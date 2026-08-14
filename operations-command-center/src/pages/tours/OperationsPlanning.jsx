import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { 
  CheckSquare, Calendar, Users, IndianRupee, AlertCircle, Briefcase, Plus,
  MapPin, Edit, Trash2, ArrowRight, ArrowLeft, CheckCircle2, Clock, Sparkles,
  Layers, LayoutGrid, List, ChevronRight
} from 'lucide-react';
import OperationsPlanEditor from './OperationsPlanEditor';

const LIFECYCLE_COLUMNS = [
  {
    id: 'PLAN',
    title: '1. PLAN',
    subtitle: 'Seasonality, festival demand & capacity scoping',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.25)'
  },
  {
    id: 'CREATE',
    title: '2. CREATE',
    subtitle: 'Itinerary, vendor bookings & dept handovers',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.25)'
  },
  {
    id: 'EXECUTE',
    title: '3. EXECUTE',
    subtitle: 'Ground operations, guest manifest & live departures',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)'
  },
  {
    id: 'POST',
    title: '4. POST / UPDATE',
    subtitle: 'P&L reconciliation, actual costs & guest feedback',
    color: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.08)',
    border: 'rgba(167, 139, 250, 0.25)'
  }
];

const OperationsPlanning = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [selectedTour, setSelectedTour] = useState(null);
  const [activeStageFilter, setActiveStageFilter] = useState('ALL');

  const loadData = async () => {
    const allTours = await dataService.getTours();
    setTours(allTours || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(user?.role);

  const handleStageChange = async (tourId, newStage) => {
    await dataService.advanceTourLifecycle(tourId, newStage);
    loadData();
  };

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <ToursLayout
      title="Operations Planning"
      subtitle="End-to-end operational lifecycle: Plan → Create → Execute → Post/Update with automatic cross-department sync."
    >
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Workflow breadcrumb description */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 700, color: '#60A5FA' }}>PLAN</span>
          <ChevronRight size={14} />
          <span style={{ fontWeight: 700, color: '#F59E0B' }}>CREATE</span>
          <ChevronRight size={14} />
          <span style={{ fontWeight: 700, color: '#10B981' }}>EXECUTE</span>
          <ChevronRight size={14} />
          <span style={{ fontWeight: 700, color: '#A78BFA' }}>POST / UPDATE</span>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setViewMode('kanban')}
            style={{
              background: viewMode === 'kanban' ? 'rgba(59, 130, 246, 0.2)' : 'none',
              color: viewMode === 'kanban' ? '#60A5FA' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <LayoutGrid size={14} /> Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              background: viewMode === 'table' ? 'rgba(59, 130, 246, 0.2)' : 'none',
              color: viewMode === 'table' ? '#60A5FA' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <List size={14} /> Table View
          </button>
        </div>
      </div>

      {/* 1. KANBAN LIFECYCLE VIEW */}
      {viewMode === 'kanban' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {LIFECYCLE_COLUMNS.map(col => {
            const colTours = tours.filter(t => (t.lifecycleStage || 'PLAN') === col.id);
            return (
              <div 
                key={col.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${col.border}`,
                  borderRadius: '12px',
                  padding: '1rem',
                  minHeight: '600px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Column Header */}
                <div style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: col.color }}>
                      {col.title}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: col.bg,
                      color: col.color,
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      {colTours.length}
                    </span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                    {col.subtitle}
                  </p>
                </div>

                {/* Cards List */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {colTours.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                      No tours in {col.title} stage
                    </div>
                  ) : (
                    colTours.map(tour => (
                      <div
                        key={tour.id}
                        className="card"
                        style={{
                          padding: '1rem',
                          background: 'rgba(30, 41, 59, 0.7)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                            {tour.name}
                          </h4>
                          <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#60A5FA' }}>
                            {tour.travelMonth}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} /> {tour.destination}
                        </div>

                        {/* Stage Specific Highlights */}
                        <div style={{
                          background: 'rgba(0,0,0,0.3)',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px'
                        }}>
                          {col.id === 'PLAN' && (
                            <>
                              <div><strong>Scoping:</strong> {tour.sales?.targetCustomers || 20} Pax Target</div>
                              <div><strong>Est. Revenue:</strong> {formatINR(tour.finance?.plannedRevenue || 1000000)}</div>
                            </>
                          )}
                          {col.id === 'CREATE' && (
                            <>
                              <div><strong>Marketing Creatives:</strong> {tour.marketingNeeds?.creativesRequired || 4} Needed</div>
                              <div><strong>Sales Briefing:</strong> Published to Sales</div>
                            </>
                          )}
                          {col.id === 'EXECUTE' && (
                            <>
                              <div><strong>Departure Date:</strong> {tour.travelDate || 'Oct 2026'}</div>
                              <div><strong>Ground Status:</strong> Ready • Guides assigned</div>
                            </>
                          )}
                          {col.id === 'POST' && (
                            <>
                              <div><strong>Actual Revenue:</strong> {formatINR(tour.finance?.actualRevenue || 1000000)}</div>
                              <div><strong>Actual Profit:</strong> {formatINR(tour.finance?.actualProfit || 650000)}</div>
                            </>
                          )}
                        </div>

                        {/* Lifecycle Movement Actions */}
                        {isOpsOrAdmin && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            {col.id !== 'PLAN' ? (
                              <button
                                onClick={() => {
                                  const stages = ['PLAN', 'CREATE', 'EXECUTE', 'POST'];
                                  const prev = stages[stages.indexOf(col.id) - 1];
                                  handleStageChange(tour.id, prev);
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                              >
                                <ArrowLeft size={11} /> Back
                              </button>
                            ) : <div></div>}

                            {col.id !== 'POST' && (
                              <button
                                onClick={() => {
                                  const stages = ['PLAN', 'CREATE', 'EXECUTE', 'POST'];
                                  const next = stages[stages.indexOf(col.id) + 1];
                                  handleStageChange(tour.id, next);
                                }}
                                style={{ background: 'none', border: 'none', color: col.color, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                              >
                                Advance <ArrowRight size={11} />
                              </button>
                            )}
                          </div>
                        )}

                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.9rem 1rem' }}>Tour & Destination</th>
                <th style={{ padding: '0.9rem 1rem' }}>Travel Month</th>
                <th style={{ padding: '0.9rem 1rem' }}>Lifecycle Stage</th>
                <th style={{ padding: '0.9rem 1rem' }}>Target Pax</th>
                <th style={{ padding: '0.9rem 1rem' }}>Target Revenue</th>
                <th style={{ padding: '0.9rem 1rem' }}>Marketing Handover</th>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => {
                const stage = LIFECYCLE_COLUMNS.find(s => s.id === (tour.lifecycleStage || 'PLAN')) || LIFECYCLE_COLUMNS[0];
                return (
                  <tr key={tour.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{tour.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{tour.destination}</div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>{tour.travelMonth}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: stage.bg,
                        color: stage.color,
                        border: `1px solid ${stage.color}40`
                      }}>
                        {stage.title}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>{tour.sales?.targetCustomers || 20} Pax</td>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>{formatINR(tour.finance?.plannedRevenue || 1000000)}</td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#EC4899', fontWeight: 600 }}>
                        {tour.marketingNeeds?.creativesRequired || 4} Creatives • {formatINR(tour.marketingNeeds?.estimatedBudget || 100000)}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      {isOpsOrAdmin && (
                        <select
                          value={tour.lifecycleStage || 'PLAN'}
                          onChange={e => handleStageChange(tour.id, e.target.value)}
                          className="form-control"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          <option value="PLAN">1. Plan</option>
                          <option value="CREATE">2. Create</option>
                          <option value="EXECUTE">3. Execute</option>
                          <option value="POST">4. Post/Update</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </ToursLayout>
  );
};

export default OperationsPlanning;
