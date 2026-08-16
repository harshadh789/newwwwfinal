import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Globe,
  MapPin, CheckCircle2, Navigation
} from 'lucide-react';

const EVENT_TYPES = [
  { value: '', label: 'All Events' },
  { value: 'FESTIVAL', label: 'Festivals' },
  { value: 'PUBLIC_HOLIDAY', label: 'Public Holidays' },
  { value: 'SCHOOL_HOLIDAY', label: 'School Holidays' },
  { value: 'LONG_WEEKEND', label: 'Long Weekends' },
];

const TYPE_META = {
  FESTIVAL:       { label: 'Festival',        color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  symbol: '✦' },
  PUBLIC_HOLIDAY: { label: 'Public Holiday',  color: '#60A5FA', bg: 'rgba(59,130,246,0.15)',  symbol: '⚑' },
  SCHOOL_HOLIDAY: { label: 'School Holiday',  color: '#34D399', bg: 'rgba(16,185,129,0.15)',  symbol: '◆' },
  LONG_WEEKEND:   { label: 'Long Weekend',    color: '#A78BFA', bg: 'rgba(139,92,246,0.15)',  symbol: '▲' },
};

const STAGE_COLORS = {
  'Tour Planning': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)' },
  'Reviewing': { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
  'Tour Scheduled': { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: 'rgba(16, 185, 129, 0.3)' }
};

const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

const FestivalsCalendarPlus = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Default Oct 2026 to show Diwali events
  const [festivals, setFestivals] = useState([]);
  const [tours, setTours] = useState([]);
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [activeAddTab, setActiveAddTab] = useState('tour'); // tour, festival, bulk
  const [bulkStep, setBulkStep] = useState(1); // 1: Import, 2: Map, 3: Verify, 4: Done
  
  const [form, setForm] = useState({
    tourName: '',
    destination: '',
    estimatedProfit: 425000,
    targetAudience: 'Families, HNI Luxury Travellers',
    notes: ''
  });

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(user?.role);

  const loadData = async () => {
    try {
      const festList = await dataService.getFestivals();
      setFestivals(festList || []);
      const tourList = await dataService.getTours();
      
      const mappedTours = (tourList || []).map(t => {
        let stage = t.lifecycleStage || t.status || 'Tour Planning';
        if (stage === 'PLANNING' || stage === 'Proposed') stage = 'Tour Planning';
        if (stage === 'REVIEWING') stage = 'Reviewing';
        if (stage === 'SCHEDULED' || stage === 'Approved' || stage === 'Scheduled') stage = 'Tour Scheduled';
        return { ...t, currentStage: stage };
      });
      setTours(mappedTours);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setShowTourModal(true);
  };

  const handleApproveTour = async (id) => {
    // Fake update
    const updated = tours.map(t => t.id === id ? { ...t, currentStage: 'Tour Scheduled' } : t);
    setTours(updated);
    // In real app, call service
    try {
      await dataService.advanceTourLifecycle(id, 'SCHEDULED');
    } catch (e) {}
    setShowTourModal(false);
  };

  const handleProposeSubmit = async (e) => {
    e.preventDefault();
    const newTour = {
      id: `t${Date.now()}`,
      name: form.tourName,
      tourName: form.tourName,
      destination: form.destination,
      travelMonth: form.travelMonth,
      startDate: form.startDate,
      endDate: form.endDate,
      lifecycleStage: 'PLANNING',
      festivalId: form.festivalId,
      sales: {
        targetCustomers: form.targetPax,
      },
      finance: {
        plannedRevenue: form.targetPax * form.pricePerPerson
      },
      notes: form.notes
    };
    await dataService.addTour(newTour);
    
    // Auto-link tour to festival
    if (form.festivalId) {
      const data = JSON.parse(localStorage.getItem('campfly_v2_data'));
      const fest = data.calendarEvents.find(ev => ev.id === form.festivalId);
      if (fest) {
        if (!fest.tourIds) fest.tourIds = [];
        fest.tourIds.push(newTour.id);
        localStorage.setItem('campfly_v2_data', JSON.stringify(data));
      }
    }
    
    setShowProposeModal(false);
    loadData();
  };


  // Generate calendar days
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push({ empty: true, date: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    
    const dayEvents = festivals.filter(f => {
      const start = new Date(f.startDate);
      const end = new Date(f.endDate || f.startDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });

    const dayTours = tours.filter(t => {
      if (t.startDate) {
        const ts = new Date(t.startDate);
        const te = new Date(t.endDate || t.startDate);
        const current = new Date(dateStr);
        return current >= ts && current <= te;
      }
      return false; 
    });

    calendarCells.push({ empty: false, date: d, fullDate: dateStr, events: dayEvents, tours: dayTours });
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <ToursLayout
      title={<span className="text-gradient">Festival & Holiday Calendar</span>}
      subtitle="Centralized calendar for managing festivals, school holidays, and scheduling all holiday tours."
    >
      
      {/* Calendar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <button onClick={handlePrevMonth} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
            <ChevronLeft size={20} />
          </button>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, width: '180px', textAlign: 'center', color: '#fff' }}>
            {monthName} {year}
          </h2>
          <button onClick={handleNextMonth} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
             <span style={{ width: '12px', height: '12px', background: STAGE_COLORS['Tour Planning'].bg, border: `1px solid ${STAGE_COLORS['Tour Planning'].border}`, borderRadius: '3px' }}></span> Planning
             <span style={{ width: '12px', height: '12px', background: STAGE_COLORS['Reviewing'].bg, border: `1px solid ${STAGE_COLORS['Reviewing'].border}`, borderRadius: '3px', marginLeft: '0.5rem' }}></span> Reviewing
             <span style={{ width: '12px', height: '12px', background: STAGE_COLORS['Tour Scheduled'].bg, border: `1px solid ${STAGE_COLORS['Tour Scheduled'].border}`, borderRadius: '3px', marginLeft: '0.5rem' }}></span> Scheduled
           </div>
           
           {isOpsOrAdmin && (
             <button
               onClick={() => { setShowProposeModal(true); setActiveAddTab('tour'); }}
               className="btn btn-primary"
               style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
             >
               <Plus size={15} /> Add
             </button>
           )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'rgba(10, 15, 29, 0.6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
            <div key={d} style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {d}
            </div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {calendarCells.map((cell, idx) => (
            
            <div key={idx} 
              onClick={() => {
                if (!cell.empty && isOpsOrAdmin) {
                  setForm(prev => ({ ...prev, startDate: cell.fullDate, endDate: cell.fullDate, festivalId: '' }));
                  setActiveAddTab('tour');
                  setShowProposeModal(true);
                }
              }}
              style={{ cursor: (!cell.empty && isOpsOrAdmin) ? 'pointer' : 'default', minHeight: '130px', 
              padding: '0.5rem', 
              borderRight: (idx + 1) % 7 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              borderBottom: idx < calendarCells.length - 7 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: cell.empty ? 'rgba(0,0,0,0.2)' : 'transparent',
              position: 'relative'
            }}>
              {!cell.empty && (
                <>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textAlign: 'right' }}>
                    {cell.date}
                  </div>
                  
                  {/* Festivals */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '0.5rem' }}>
                    {cell.events.map(ev => {
                      const m = TYPE_META[ev.type] || TYPE_META.FESTIVAL;
                      return (
                        <div key={ev.id} style={{ 
                          fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', 
                          background: m.bg, color: m.color, border: `1px solid ${m.color}44`,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          fontWeight: 600
                        }} title={ev.name}>
                          {m.symbol} {ev.name}
                        </div>
                      );
                    })}
                  </div>

                  {/* Tours */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {cell.tours.map(tour => {
                      const sc = STAGE_COLORS[tour.currentStage] || STAGE_COLORS['Tour Planning'];
                      return (
                        <div 
                          key={tour.id} 
                          onClick={(e) => { e.stopPropagation(); handleTourClick(tour); }}
                          style={{ 
                            fontSize: '0.75rem', padding: '0.3rem 0.5rem', borderRadius: '6px', 
                            background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                            fontWeight: 700, transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                          title={`${tour.name || tour.tourName} - ${tour.currentStage}`}
                        >
                          <Navigation size={10} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tour.name || tour.tourName}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tour Details Modal */}
      {showTourModal && selectedTour && (
        <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setShowTourModal(false); }}>
          <div className="modal-content card animate-slide-up" style={{ maxWidth: '600px', background: 'var(--surface-color)', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {selectedTour.tourName || selectedTour.name}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--primary-color)" /> {selectedTour.destination}
                </div>
              </div>
              <button onClick={() => setShowTourModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex' }}><X size={24} /></button>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Dates</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{selectedTour.startDate} to {selectedTour.endDate}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Current Stage</div>
                  <div style={{ 
                    display: 'inline-block', fontSize: '0.85rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px',
                    background: STAGE_COLORS[selectedTour.currentStage]?.bg, color: STAGE_COLORS[selectedTour.currentStage]?.color
                  }}>
                    {selectedTour.currentStage}
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Target Bookings</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{selectedTour.targetPax || selectedTour.sales?.targetCustomers || '-'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Expected Revenue</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>{formatINR(selectedTour.estimatedRevenue || selectedTour.finance?.plannedRevenue)}</div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Operational Notes</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-tertiary)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  {selectedTour.notes || "No operational notes provided."}
                </p>
              </div>

              {selectedTour.currentStage !== 'Tour Scheduled' && isOpsOrAdmin && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                  <button 
                    onClick={() => handleApproveTour(selectedTour.id)}
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', gap: '6px' }}
                  >
                    <CheckCircle2 size={16} /> Mark as Tour Scheduled
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showProposeModal && (
        <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setShowProposeModal(false); }}>
          <div className="modal-content card animate-slide-up" style={{ maxWidth: '650px', background: 'var(--surface-color)', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} style={{ color: 'var(--primary-color)' }} /> Add to Calendar
              </h2>
              <button onClick={() => setShowProposeModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex' }}><X size={24} /></button>
            </div>
            
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', padding: '0 2rem', background: 'rgba(0,0,0,0.2)' }}>
              <div 
                onClick={() => setActiveAddTab('tour')}
                style={{ padding: '1rem 0', marginRight: '2rem', cursor: 'pointer', color: activeAddTab === 'tour' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeAddTab === 'tour' ? '2px solid var(--primary-color)' : '2px solid transparent', fontWeight: activeAddTab === 'tour' ? 700 : 500 }}
              >
                Add Proposed Holiday Tour
              </div>
              <div 
                onClick={() => setActiveAddTab('festival')}
                style={{ padding: '1rem 0', marginRight: '2rem', cursor: 'pointer', color: activeAddTab === 'festival' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeAddTab === 'festival' ? '2px solid var(--primary-color)' : '2px solid transparent', fontWeight: activeAddTab === 'festival' ? 700 : 500 }}
              >
                Link Festival / School Holiday
              </div>
              <div 
                onClick={() => { setActiveAddTab('bulk'); setBulkStep(1); }}
                style={{ padding: '1rem 0', cursor: 'pointer', color: activeAddTab === 'bulk' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeAddTab === 'bulk' ? '2px solid var(--primary-color)' : '2px solid transparent', fontWeight: activeAddTab === 'bulk' ? 700 : 500 }}
              >
                Bulk Import
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              {activeAddTab === 'tour' && (
                <form onSubmit={handleProposeSubmit}>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Linked Festival / School Holiday</label>
                    <select
                      value={form.festivalId}
                      onChange={e => setForm({ ...form, festivalId: e.target.value })}
                      className="form-control"
                      required
                    >
                      <option value="">Select Festival or Long Weekend</option>
                      {festivals.map(f => (
                        <option key={f.id} value={f.id}>{f.name} ({f.startDate})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Proposed Tour Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Diwali in Desert Luxury"
                        value={form.tourName}
                        onChange={e => setForm({ ...form, tourName: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Destination</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Rajasthan"
                        value={form.destination}
                        onChange={e => setForm({ ...form, destination: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        required
                        value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        required
                        value={form.endDate}
                        onChange={e => setForm({ ...form, endDate: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Target Bookings</label>
                      <input
                        type="number"
                        value={form.targetPax}
                        onChange={e => setForm({ ...form, targetPax: parseInt(e.target.value) || 20 })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Price / Seat (₹)</label>
                      <input
                        type="number"
                        step="5000"
                        value={form.pricePerPerson}
                        onChange={e => setForm({ ...form, pricePerPerson: parseInt(e.target.value) || 40000 })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                    <label className="form-label">Planning & Operation Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Explain why this holiday tour is viable and what special experiences are included..."
                      value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowProposeModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit Proposal</button>
                  </div>
                </form>
              )}

              {activeAddTab === 'festival' && (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  await dataService.addFestival(festivalForm);
                  setShowProposeModal(false);
                  loadData();
                }}>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Festival / Event Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Diwali, Summer Break"
                      value={festivalForm.name}
                      onChange={e => setFestivalForm({ ...festivalForm, name: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Type</label>
                    <select
                      value={festivalForm.type}
                      onChange={e => setFestivalForm({ ...festivalForm, type: e.target.value })}
                      className="form-control"
                    >
                      <option value="FESTIVAL">Festival</option>
                      <option value="LONG_WEEKEND">Long Weekend</option>
                      <option value="SCHOOL_HOLIDAY">School Holiday</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        required
                        value={festivalForm.startDate}
                        onChange={e => setFestivalForm({ ...festivalForm, startDate: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        required
                        value={festivalForm.endDate}
                        onChange={e => setFestivalForm({ ...festivalForm, endDate: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowProposeModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add Event</button>
                  </div>
                </form>
              )}

              {activeAddTab === 'bulk' && (
                <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', padding: '0 2rem' }}>
                    {['Import', 'Map', 'Verify', 'Done'].map((step, idx) => (
                      <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: bulkStep >= idx + 1 ? 1 : 0.4 }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: bulkStep > idx + 1 ? 'var(--primary-color)' : bulkStep === idx + 1 ? 'rgba(0, 230, 230, 0.2)' : 'rgba(255,255,255,0.1)', border: bulkStep === idx + 1 ? '2px solid var(--primary-color)' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: bulkStep > idx + 1 ? '#000' : '#fff', fontWeight: 700 }}>
                          {bulkStep > idx + 1 ? <CheckCircle2 size={18} /> : idx + 1}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '2rem', border: '1px dashed var(--glass-border)' }}>
                    {bulkStep === 1 && (
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Upload CSV / Excel</h3>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Upload a file containing multiple proposed holiday tours.</p>
                        <button className="btn btn-outline" onClick={() => setBulkStep(2)}>Select File...</button>
                      </div>
                    )}
                    {bulkStep === 2 && (
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Map Columns</h3>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Auto-mapped 6/6 columns successfully.</p>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'left', marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'var(--text-secondary)' }}>Tour Name</span> <strong style={{ color: '#00E676' }}>Mapped</strong></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'var(--text-secondary)' }}>Destination</span> <strong style={{ color: '#00E676' }}>Mapped</strong></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'var(--text-secondary)' }}>Start Date</span> <strong style={{ color: '#00E676' }}>Mapped</strong></div>
                        </div>
                        <button className="btn btn-primary" onClick={() => setBulkStep(3)}>Continue to Verify</button>
                      </div>
                    )}
                    {bulkStep === 3 && (
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Verify Data</h3>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>24 proposed tours ready to import. 0 errors found.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                          <button className="btn btn-secondary" onClick={() => setBulkStep(2)}>Back</button>
                          <button className="btn btn-primary" onClick={() => setBulkStep(4)}>Import Tours</button>
                        </div>
                      </div>
                    )}
                    {bulkStep === 4 && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#00E676', marginBottom: '1rem' }}><CheckCircle2 size={48} /></div>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Import Complete</h3>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>24 tours were successfully imported and added to the calendar.</p>
                        <button className="btn btn-primary" onClick={() => setShowProposeModal(false)}>Done</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default FestivalsCalendarPlus;
