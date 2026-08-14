import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { 
  Search, Plus, MapPin, DollarSign, Target, Calendar, Layers,
  Megaphone, TrendingUp, CheckCircle2, Clock, Sparkles, Eye, X, Edit, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LIFECYCLE_STAGES = [
  { id: 'PLAN', label: '1. PLAN', color: '#60A5FA', bg: 'rgba(59, 130, 246, 0.15)' },
  { id: 'CREATE', label: '2. CREATE', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
  { id: 'EXECUTE', label: '3. EXECUTE', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  { id: 'POST', label: '4. POST/UPDATE', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.15)' }
];

const TourCatalogue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('ALL');
  const [selectedTour, setSelectedTour] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New tour form
  const [form, setForm] = useState({
    name: '',
    destination: '',
    category: 'Domestic',
    travelMonth: 'October',
    travelDate: '2026-10-15',
    season: 'Peak',
    priority: 'High',
    lifecycleStage: 'PLAN',
    plannedRevenue: 1000000,
    plannedProductionCost: 400000,
    targetCustomers: 20,
    creativesRequired: 4,
    estimatedMarketingBudget: 120000,
    usps: '',
    targetAudience: 'HNIs and Luxury Travellers'
  });

  const loadData = async () => {
    const allTours = await dataService.getTours();
    setTours(allTours || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(user?.role);

  const handleAdvanceStage = async (tour, e) => {
    e.stopPropagation();
    const stages = ['PLAN', 'CREATE', 'EXECUTE', 'POST'];
    const currIdx = stages.indexOf(tour.lifecycleStage || 'PLAN');
    const nextStage = stages[(currIdx + 1) % stages.length];
    
    await dataService.advanceTourLifecycle(tour.id, nextStage);
    loadData();
  };

  const handleCreateTour = async (e) => {
    e.preventDefault();
    const newTour = {
      id: `t${Date.now()}`,
      name: form.name,
      destination: form.destination,
      category: form.category,
      travelMonth: form.travelMonth,
      travelDate: form.travelDate,
      season: form.season,
      priority: form.priority,
      strategicRole: 'Core Tour',
      lifecycleStage: form.lifecycleStage,
      marketing: {
        promotionStart: form.travelMonth,
        promotionEnd: form.travelMonth,
        promotionStage: 'Planning',
        priority: form.priority,
        budgetLevel: 'Medium',
        targetAudience: form.targetAudience,
        contentStrategy: `Promotional campaign for ${form.name}`,
        channels: ['Instagram', 'Email Newsletter', 'WhatsApp'],
        keyMessages: [`Experience ${form.destination} with GoCampFly`]
      },
      marketingNeeds: {
        creativesRequired: parseInt(form.creativesRequired) || 4,
        estimatedBudget: parseInt(form.estimatedMarketingBudget) || 120000,
        targetLaunchMonth: form.travelMonth,
        channels: ['Instagram', 'Email Newsletter', 'WhatsApp'],
        campaignStatus: 'Pending'
      },
      sales: {
        focusStart: form.travelMonth,
        focusEnd: form.travelMonth,
        targetCustomers: parseInt(form.targetCustomers) || 20,
        expectedRevenue: parseInt(form.plannedRevenue) || 1000000,
        feedback: []
      },
      salesBriefing: {
        usps: form.usps.split(',').map(s => s.trim()).filter(Boolean),
        targetPersona: form.targetAudience,
        minPrice: Math.round((parseInt(form.plannedRevenue) || 1000000) / (parseInt(form.targetCustomers) || 20)),
        availableSeats: parseInt(form.targetCustomers) || 20,
        bookingWindow: `${form.travelMonth} 2026`
      },
      operations: {
        preparationStart: form.travelMonth,
        preparationEnd: form.travelMonth,
        expectedCustomers: parseInt(form.targetCustomers) || 20,
        expectedProduction: parseInt(form.plannedProductionCost) || 400000,
        capacityLevel: 'High'
      },
      finance: {
        plannedRevenue: parseInt(form.plannedRevenue) || 1000000,
        actualRevenue: 0,
        plannedProductionCost: parseInt(form.plannedProductionCost) || 400000,
        actualProductionCost: 0,
        plannedProfit: (parseInt(form.plannedRevenue) || 1000000) - (parseInt(form.plannedProductionCost) || 400000),
        actualProfit: 0,
        plannedMargin: 35,
        actualMargin: 0
      }
    };

    await dataService.saveTour(newTour);
    
    // Notify Marketing & Sales
    await dataService.addNotification({
      title: 'New Tour Added to Catalogue',
      message: `Operations created "${newTour.name}". Marketing creatives needed: ${newTour.marketingNeeds.creativesRequired}. Sales briefing ready.`,
      fromDept: 'Operations',
      toDept: 'Marketing',
      type: 'TOUR_CREATED',
      link: '/marketing-strategy',
      tourId: newTour.id
    });

    await dataService.addNotification({
      title: 'Sales Product Briefing Available',
      message: `"${newTour.name}" is now in Catalogue. Study USPs & destination details.`,
      fromDept: 'Operations',
      toDept: 'Sales',
      type: 'TOUR_CREATED',
      link: '/sales-strategy',
      tourId: newTour.id
    });

    setShowAddModal(false);
    loadData();
  };

  const filteredTours = tours.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'ALL' || (t.lifecycleStage || 'PLAN') === filterStage;
    return matchesSearch && matchesStage;
  });

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <ToursLayout 
      title="Tour Catalogue" 
      subtitle="Master catalogue of all GoCampFly tours with live Operations → Marketing → Sales handovers."
    >
      {/* Top Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search catalogue by tour or destination..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', width: '100%', fontSize: '0.85rem' }}
            />
          </div>

          <select 
            className="form-control" 
            value={filterStage} 
            onChange={e => setFilterStage(e.target.value)}
            style={{ width: '180px', fontSize: '0.85rem' }}
          >
            <option value="ALL">All Lifecycle Stages</option>
            <option value="PLAN">1. PLAN Stage</option>
            <option value="CREATE">2. CREATE Stage</option>
            <option value="EXECUTE">3. EXECUTE Stage</option>
            <option value="POST">4. POST/UPDATE Stage</option>
          </select>
        </div>

        {isOpsOrAdmin && (
          <button 
            className="btn btn-primary" 
            onClick={() => setShowAddModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <Plus size={16} /> Create Tour Product
          </button>
        )}
      </div>

      {/* Grid of Tour Cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredTours.map(tour => {
          const stage = LIFECYCLE_STAGES.find(s => s.id === (tour.lifecycleStage || 'PLAN')) || LIFECYCLE_STAGES[0];
          return (
            <div 
              key={tour.id} 
              className="card" 
              onClick={() => setSelectedTour(tour)}
              style={{ 
                cursor: 'pointer', 
                transition: 'all 0.2s', 
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: selectedTour?.id === tour.id ? '1px solid #60A5FA' : '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{tour.name}</h3>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#60A5FA" /> {tour.destination} • {tour.travelMonth}
                    </p>
                  </div>
                  
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: stage.bg,
                    color: stage.color,
                    border: `1px solid ${stage.color}40`
                  }}>
                    {stage.label}
                  </span>
                </div>

                {/* Financial Summary */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '8px',
                  margin: '0.75rem 0',
                  fontSize: '0.78rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Target Revenue:</span>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                      {formatINR(tour.finance?.plannedRevenue || 1000000)}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Capacity:</span>
                    <div style={{ fontWeight: 700, color: '#60A5FA', fontSize: '0.9rem' }}>
                      {tour.sales?.targetCustomers || 20} Seats
                    </div>
                  </div>
                </div>

                {/* Cross-Department Integration Handovers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem', margin: '0.5rem 0 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#EC4899' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Megaphone size={13} /> Marketing Needs:
                    </span>
                    <span style={{ fontWeight: 600 }}>{tour.marketingNeeds?.creativesRequired || 4} Creatives • {formatINR(tour.marketingNeeds?.estimatedBudget || 100000)}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#10B981' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={13} /> Sales Briefing:
                    </span>
                    <span style={{ fontWeight: 600 }}>USPs Prepared & Live</span>
                  </div>
                </div>
              </div>

              {/* Bottom Lifecycle Advance action */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Click card to view briefing</span>
                {isOpsOrAdmin && (
                  <button
                    onClick={(e) => handleAdvanceStage(tour, e)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem', gap: '4px' }}
                    title="Advance to next workflow stage"
                  >
                    Next Stage <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tour Product Briefing Drawer / Modal */}
      {selectedTour && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 1000
        }} onClick={() => setSelectedTour(null)}>
          <div style={{
            width: '520px',
            maxWidth: '90vw',
            background: '#0F172A',
            borderLeft: '1px solid var(--border-color)',
            height: '100%',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase' }}>
                  Tour Product Dossier
                </span>
                <h2 style={{ margin: '0.2rem 0', fontSize: '1.4rem', fontWeight: 800 }}>{selectedTour.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <MapPin size={14} color="#60A5FA" /> {selectedTour.destination} • {selectedTour.travelMonth}
                </div>
              </div>
              <button 
                onClick={() => setSelectedTour(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Department Handover Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Marketing Requirements */}
              <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#EC4899', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Megaphone size={16} /> Operations → Marketing Handover
                </h4>
                <div style={{ fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div><strong>Creatives Required:</strong> {selectedTour.marketingNeeds?.creativesRequired || 4} Reels/Posts</div>
                  <div><strong>Target Ad Budget:</strong> {formatINR(selectedTour.marketingNeeds?.estimatedBudget || 120000)}</div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Target Audience:</strong> {selectedTour.marketing?.targetAudience || 'HNIs & Luxury Travellers'}
                  </div>
                </div>
              </div>

              {/* Sales Product Briefing */}
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#10B981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={16} /> Operations → Sales Knowledge Briefing
                </h4>
                <div style={{ fontSize: '0.8rem' }}>
                  <div style={{ marginBottom: '0.4rem' }}>
                    <strong>Key USPs for Sales Team:</strong>
                    <ul style={{ margin: '0.2rem 0 0 1rem', padding: 0 }}>
                      {(selectedTour.salesBriefing?.usps || ['Curated luxury stays', 'Expert local guides']).map((u, i) => (
                        <li key={i} style={{ color: 'var(--text-secondary)' }}>{u}</li>
                      ))}
                    </ul>
                  </div>
                  <div><strong>Base Price per Person:</strong> {formatINR(selectedTour.salesBriefing?.minPrice || 35000)}</div>
                  <div><strong>Available Capacity:</strong> {selectedTour.salesBriefing?.availableSeats || 20} Seats</div>
                </div>
              </div>

              {/* Finance & P&L Projection */}
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#F59E0B', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={16} /> Operations → Finance P&L Targets
                </h4>
                <div style={{ fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div><strong>Planned Revenue:</strong> {formatINR(selectedTour.finance?.plannedRevenue || 1000000)}</div>
                  <div><strong>Planned Production:</strong> {formatINR(selectedTour.finance?.plannedProductionCost || 400000)}</div>
                  <div><strong>Planned Gross Profit:</strong> {formatINR(selectedTour.finance?.plannedProfit || 600000)}</div>
                  <div><strong>Target Margin:</strong> {selectedTour.finance?.plannedMargin || 35}%</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Tour Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#0F172A',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Create New Tour Product</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTour}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Tour Product Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Kerala Backwaters Luxury Escape"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Destination
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Kerala (Munnar & Alleppey)"
                    value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Travel Month
                  </label>
                  <select
                    value={form.travelMonth}
                    onChange={e => setForm({ ...form, travelMonth: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  >
                    {['August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Target Seats (Pax)
                  </label>
                  <input
                    type="number"
                    value={form.targetCustomers}
                    onChange={e => setForm({ ...form, targetCustomers: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Planned Revenue (₹)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={form.plannedRevenue}
                    onChange={e => setForm({ ...form, plannedRevenue: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Marketing Creatives Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.creativesRequired}
                    onChange={e => setForm({ ...form, creativesRequired: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Estimated Ad Budget (₹)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={form.estimatedMarketingBudget}
                    onChange={e => setForm({ ...form, estimatedMarketingBudget: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Sales USPs (comma-separated for sales reps)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Luxury private houseboat, Spice plantation walk, Zero hidden fees"
                  value={form.usps}
                  onChange={e => setForm({ ...form, usps: e.target.value })}
                  className="form-control"
                  style={{ width: '100%', padding: '0.55rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700 }}>
                  Create Tour & Notify Departments
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default TourCatalogue;
