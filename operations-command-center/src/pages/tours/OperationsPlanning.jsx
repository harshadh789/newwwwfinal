import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { 
  Calendar, Users, IndianRupee, AlertCircle, Briefcase, Plus,
  MapPin, Edit, Trash2, ArrowRight, ArrowLeft, CheckCircle2, Clock, Sparkles,
  Layers, LayoutGrid, List, ChevronRight, X
} from 'lucide-react';
import OperationsPlanEditor from './OperationsPlanEditor';

const LIFECYCLE_COLUMNS = [
  {
    id: 'PLANNING',
    title: 'Tour Planning',
    subtitle: 'Holiday tour proposal is created and submitted',
    color: '#00E6E6',
    gradient: 'linear-gradient(135deg, rgba(0, 230, 230, 0.15) 0%, rgba(0, 230, 230, 0.02) 100%)',
    border: 'rgba(0, 230, 230, 0.25)',
    icon: <Sparkles size={16} />
  },
  {
    id: 'REVIEWING',
    title: 'Reviewing',
    subtitle: 'Needs operations and management approval',
    color: '#FFB347',
    gradient: 'linear-gradient(135deg, rgba(255, 179, 71, 0.15) 0%, rgba(255, 179, 71, 0.02) 100%)',
    border: 'rgba(255, 179, 71, 0.25)',
    icon: <Clock size={16} />
  },
  {
    id: 'SCHEDULED',
    title: 'Tour Scheduled',
    subtitle: 'The approved tour is officially scheduled',
    color: '#00E676',
    gradient: 'linear-gradient(135deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 230, 118, 0.02) 100%)',
    border: 'rgba(0, 230, 118, 0.25)',
    icon: <CheckCircle2 size={16} />
  }
];

const OperationsPlanning = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [selectedTour, setSelectedTour] = useState(null);
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [editTourData, setEditTourData] = useState({});
  const [activeStageFilter, setActiveStageFilter] = useState('ALL');
  const [rejectingTour, setRejectingTour] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

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

  const handleRejectConfirm = async () => {
    if (!rejectingTour || !rejectionReason.trim()) return;
    const tour = tours.find(t => t.id === rejectingTour);
    if (tour) {
      const updatedNotes = (tour.notes ? tour.notes + '\n\n' : '') + `[REJECTED - ${new Date().toLocaleDateString()}] Reason: ${rejectionReason}`;
      await dataService.advanceTourLifecycle(rejectingTour, 'PLANNING', { notes: updatedNotes });
      loadData();
      if (selectedTour?.id === rejectingTour) {
        setSelectedTour({ ...tour, lifecycleStage: 'PLANNING', notes: updatedNotes });
      }
    }
    setRejectingTour(null);
    setRejectionReason('');
  };

  const handleEditTourSave = async () => {
    if (!selectedTour) return;
    
    const updates = {
      name: editTourData.name,
      travelMonth: editTourData.travelMonth,
      travelDate: editTourData.travelDate,
      sales: { ...selectedTour.sales, targetCustomers: editTourData.targetCustomers },
      finance: { ...selectedTour.finance, plannedRevenue: editTourData.plannedRevenue },
      notes: editTourData.notes,
      usp: editTourData.usp,
      driveLink: editTourData.driveLink,
    };
    
    await dataService.updateTour(selectedTour.id, updates);
    setIsEditingTour(false);
    setSelectedTour(null);
    loadData();
  };

  const openTourModal = (tour) => {
    setSelectedTour(tour);
    setEditTourData({
      name: tour.name || '',
      travelMonth: tour.travelMonth || '',
      travelDate: tour.travelDate || '',
      targetCustomers: tour.sales?.targetCustomers || 20,
      plannedRevenue: tour.finance?.plannedRevenue || 1000000,
      notes: tour.notes || '',
      usp: tour.usp || '',
      driveLink: tour.driveLink || ''
    });
    setIsEditingTour(false);
  };

  return (
    <ToursLayout
      title={<span className="text-gradient">Operations Planning</span>}
      subtitle="End-to-end operational lifecycle: Tour Planning → Reviewing → Tour Scheduled."
    >
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Workflow breadcrumb description */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 700, color: '#00E6E6', display: 'flex', alignItems: 'center', gap: '4px' }}><Sparkles size={14}/> Tour Planning</span>
          <ChevronRight size={14} style={{ opacity: 0.5 }} />
          <span style={{ fontWeight: 700, color: '#FFB347', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> Reviewing</span>
          <ChevronRight size={14} style={{ opacity: 0.5 }} />
          <span style={{ fontWeight: 700, color: '#00E676', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14}/> Tour Scheduled</span>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <button
            onClick={() => setViewMode('kanban')}
            className={`btn ${viewMode === 'kanban' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.4rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            <LayoutGrid size={16} /> Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.4rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            <List size={16} /> Table View
          </button>
        </div>
      </div>

      {/* 1. KANBAN LIFECYCLE VIEW */}
      {viewMode === 'kanban' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
          {LIFECYCLE_COLUMNS.map(col => {
            const colTours = tours.filter(t => (t.lifecycleStage || 'PLANNING') === col.id);
            return (
              <div 
                key={col.id}
                style={{
                  background: 'var(--glass-bg)',
                  border: `1px solid ${col.border}`,
                  borderRadius: '16px',
                  minHeight: 'calc(100vh - 280px)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Column Header */}
                <div style={{ padding: '1.5rem', background: col.gradient, borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: col.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {col.icon} {col.title}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      background: 'rgba(0,0,0,0.3)',
                      color: col.color,
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {colTours.length}
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {col.subtitle}
                  </p>
                </div>

                {/* Cards List */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', overflowY: 'auto' }} className="animate-slide-up">
                  {colTours.length === 0 ? (
                    <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      No tours in {col.title} stage
                    </div>
                  ) : (
                    colTours.map(tour => (
                      <div
                        key={tour.id}
                        className="card card-hover"
                        onClick={() => openTourModal(tour)}
                        style={{ cursor: 'pointer', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                            {tour.name}
                          </h4>
                          <span className="pill pill-primary" style={{ fontSize: '0.65rem' }}>
                            {tour.travelMonth}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} className="glow-icon" style={{ color: col.color }} /> {tour.destination}
                        </div>

                        {/* Stage Specific Highlights */}
                        <div style={{
                          background: 'rgba(0,0,0,0.2)',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          border: '1px solid var(--glass-border)'
                        }}>
                          {col.id === 'PLANNING' && (
                            <>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Scoping:</strong> {tour.sales?.targetCustomers || 20} Bookings Target</div>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Expected Revenue:</strong> {formatINR(tour.finance?.plannedRevenue || 1000000)}</div>
                            </>
                          )}
                          {col.id === 'REVIEWING' && (
                            <>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Creatives:</strong> {tour.marketingNeeds?.creativesRequired || 4} Needed</div>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Sales Briefing:</strong> Pending</div>
                            </>
                          )}
                          {col.id === 'SCHEDULED' && (
                            <>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Departure:</strong> {tour.travelDate || 'Oct 2026'}</div>
                              <div><strong style={{ color: 'var(--text-secondary)' }}>Ground Status:</strong> Ready • Guides assigned</div>
                            </>
                          )}
                        </div>

                        {/* Lifecycle Movement Actions */}
                        {isOpsOrAdmin && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
                            {col.id !== 'PLANNING' ? (
                              <button
                                onClick={(e) => { 
                                  e.stopPropagation();
                                  const stages = ['PLANNING', 'REVIEWING', 'SCHEDULED'];
                                  const prev = stages[stages.indexOf(col.id) - 1];
                                  handleStageChange(tour.id, prev);
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                                onMouseOut={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
                              >
                                <ArrowLeft size={14} /> Back
                              </button>
                            ) : <div></div>}

                            {col.id !== 'SCHEDULED' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const stages = ['PLANNING', 'REVIEWING', 'SCHEDULED'];
                                  const next = stages[stages.indexOf(col.id) + 1];
                                  handleStageChange(tour.id, next);
                                }}
                                style={{ background: 'none', border: 'none', color: col.color, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', textShadow: `0 0 10px ${col.color}` }}
                              >
                                Advance <ArrowRight size={14} />
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
        <div className="table-container animate-slide-up" style={{ marginTop: '2rem' }}>
          <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th style={{ position: 'sticky', left: 0, background: 'var(--surface-color)', zIndex: 10, width: '250px' }}>Tour & Destination</th>
                <th style={{ textAlign: 'center' }}>Travel Month</th>
                <th style={{ textAlign: 'center' }}>Current Stage</th>
                <th style={{ textAlign: 'right' }}>Target Bookings</th>
                <th style={{ textAlign: 'right' }}>Expected Revenue</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => {
                const stage = LIFECYCLE_COLUMNS.find(s => s.id === (tour.lifecycleStage || 'PLANNING')) || LIFECYCLE_COLUMNS[0];
                return (
                  <tr key={tour.id} style={{ cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => openTourModal(tour)}>
                    <td style={{ position: 'sticky', left: 0, background: 'var(--surface-color)', zIndex: 10, borderRight: '1px solid var(--glass-border)' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', marginBottom: '4px' }}>{tour.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> {tour.destination}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="pill pill-primary" style={{ fontSize: '0.7rem' }}>{tour.travelMonth}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`pill ${stage.id === 'PLANNING' ? 'pill-primary' : stage.id === 'REVIEWING' ? 'pill-warning' : 'pill-success'}`} style={{ fontSize: '0.7rem' }}>
                        {stage.title}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{tour.sales?.targetCustomers || 20}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#fff' }}>{formatINR(tour.finance?.plannedRevenue || 1000000)}</td>
                    <td style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                      {isOpsOrAdmin && (
                        <select
                          value={tour.lifecycleStage || 'PLANNING'}
                          onChange={e => handleStageChange(tour.id, e.target.value)}
                          className="form-control"
                          style={{ padding: '0.5rem', fontSize: '0.8rem', width: '140px', background: 'rgba(0,0,0,0.5)' }}
                        >
                          <option value="PLANNING">Tour Planning</option>
                          <option value="REVIEWING">Reviewing</option>
                          <option value="SCHEDULED">Tour Scheduled</option>
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

      {/* 3. TOUR DETAILS MODAL */}
      {selectedTour && (
        <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setSelectedTour(null); }}>
          <div className="modal-content card" style={{ maxWidth: '750px', padding: '0', background: 'var(--surface-color)' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <span className={`pill ${selectedTour.lifecycleStage === 'SCHEDULED' ? 'pill-success' : selectedTour.lifecycleStage === 'REVIEWING' ? 'pill-warning' : 'pill-primary'}`} style={{ marginBottom: '1rem' }}>
                  {selectedTour.lifecycleStage || 'PLANNING'}
                </span>
                <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {selectedTour.name}
                </h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16}/> {selectedTour.destination}</div>
              </div>
              <button onClick={() => setSelectedTour(null)} className="btn-secondary" style={{ padding: '0.75rem', borderRadius: '50%' }}><X size={24} /></button>
            </div>
            
            <div style={{ padding: '2rem' }}>
              {isEditingTour ? (
                <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Destination</label>
                      <input type="text" className="form-control" value={selectedTour.destination} disabled style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-tertiary)', cursor: 'not-allowed' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Proposed Tour Title</label>
                      <input type="text" className="form-control" value={editTourData.name} onChange={e => setEditTourData({...editTourData, name: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">USP</label>
                      <input type="text" className="form-control" value={editTourData.usp} onChange={e => setEditTourData({...editTourData, usp: e.target.value})} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Google Drive Link</label>
                      <input type="text" className="form-control" value={editTourData.driveLink} onChange={e => setEditTourData({...editTourData, driveLink: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Travel Month</label>
                      <input type="text" className="form-control" value={editTourData.travelMonth} onChange={e => setEditTourData({...editTourData, travelMonth: e.target.value})} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Travel Date (Optional)</label>
                      <input type="text" className="form-control" value={editTourData.travelDate} onChange={e => setEditTourData({...editTourData, travelDate: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Target Bookings</label>
                      <input type="number" className="form-control" value={editTourData.targetCustomers} onChange={e => setEditTourData({...editTourData, targetCustomers: parseInt(e.target.value)})} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Expected Revenue (₹)</label>
                      <input type="number" className="form-control" value={editTourData.plannedRevenue} onChange={e => setEditTourData({...editTourData, plannedRevenue: parseInt(e.target.value)})} />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Operational Notes</label>
                    <textarea rows="4" className="form-control" value={editTourData.notes} onChange={e => setEditTourData({...editTourData, notes: e.target.value})} />
                  </div>
                </div>
              ) : (
                <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Dates & Scheduling</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Travel Month:</span> <strong style={{ color: '#fff' }}>{selectedTour.travelMonth}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Travel Date:</span> <strong style={{ color: '#fff' }}>{selectedTour.travelDate || 'TBD'}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Due Date (Prep):</span> <strong style={{ color: '#fff' }}>{selectedTour.operations?.preparationEnd || 'TBD'}</strong></div>
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Pricing & Capacity</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Target Bookings:</span> <strong style={{ color: '#fff' }}>{selectedTour.sales?.targetCustomers || 20}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Expected Revenue:</span> <strong style={{ color: '#00E676' }}>{formatINR(selectedTour.finance?.plannedRevenue || 1000000)}</strong></div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', gridColumn: '1 / -1' }}>
                    <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Additional Info</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>USP:</span> <strong style={{ color: '#fff' }}>{selectedTour.usp || 'N/A'}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Drive Link:</span> 
                        {selectedTour.driveLink ? <a href={selectedTour.driveLink} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)' }}>View Folder</a> : <strong style={{ color: '#fff' }}>N/A</strong>}
                      </div>
                    </div>
                  </div>

                  <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.15)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Operational Notes</h4>
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {selectedTour.notes || 'No operational notes provided yet.'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
              {!isEditingTour ? (
                <button onClick={() => setIsEditingTour(true)} className="btn btn-outline"><Edit size={16}/> Edit Tour</button>
              ) : (
                <button onClick={() => setIsEditingTour(false)} className="btn btn-secondary">Cancel</button>
              )}
              
              {!isEditingTour ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {selectedTour.lifecycleStage !== 'PLANNING' && (
                    <button onClick={() => setRejectingTour(selectedTour.id)} className="btn btn-danger"><AlertCircle size={16}/> Reject</button>
                  )}
                  <button onClick={() => setSelectedTour(null)} className="btn btn-primary">Done</button>
                </div>
              ) : (
                <button onClick={handleEditTourSave} className="btn btn-primary">Save Changes</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. REJECTION MODAL */}
      {rejectingTour && (
        <div className="modal-overlay">
          <div className="modal-content card animate-slide-up" style={{ maxWidth: '450px', background: 'var(--surface-color)', border: '1px solid rgba(255, 77, 77, 0.3)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#FF4D4D', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem' }}>
              <AlertCircle size={24} className="glow-icon" /> Reject Tour
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Please provide a reason for rejecting this tour back to the Planning stage. This is mandatory for operational logs.
            </p>
            <textarea 
              autoFocus
              required
              value={rejectionReason} 
              onChange={e => setRejectionReason(e.target.value)} 
              className="form-control" 
              placeholder="e.g. Needs revised pricing model..."
              style={{ minHeight: '100px', marginBottom: '1.5rem', fontSize: '1rem' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => { setRejectingTour(null); setRejectionReason(''); }} className="btn btn-secondary">Cancel</button>
              <button onClick={handleRejectConfirm} disabled={!rejectionReason.trim()} className="btn" style={{ background: '#FF4D4D', color: '#fff', opacity: !rejectionReason.trim() ? 0.5 : 1 }}>
                Reject Tour
              </button>
            </div>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default OperationsPlanning;
