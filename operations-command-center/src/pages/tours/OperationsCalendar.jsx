import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import CalendarEditor from './CalendarEditor';
import { ChevronDown, Calendar as CalendarIcon, Edit, MapPin, Plus, Table, CalendarDays, Search, X } from 'lucide-react';

const OperationsCalendar = () => {
  const { session } = useAuth();
  const isAdmin = session?.role === 'ADMIN' || session?.role === 'OPERATIONS';

  // Core State
  const [activeView, setActiveView] = useState('MONTH'); // MONTH, MATRIX, YEAR
  const [selectedMonth, setSelectedMonth] = useState(7); // Default to August (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [filterType, setFilterType] = useState('ALL'); // ALL, DOMESTIC, INTERNATIONAL
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data State
  const [tours, setTours] = useState([]);
  const [seasonality, setSeasonality] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [plans, setPlans] = useState([]);
  
  // Modals State
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const t = await dataService.getTours();
    const s = await dataService.getSeasonality();
    const f = await dataService.getFestivals();
    const p = await dataService.getOperationsPlans();
    const c = await dataService.getConfirmedTours();
    
    setTours(t || []);
    setSeasonality((s || []).filter(d => d.status !== 'ARCHIVED'));
    setFestivals(f || []);
    
    setPlans([
      ...(c || []).map(x => ({ ...x, status: 'Confirmed', isConfirmed: true })),
      ...(p || [])
    ]);
  };

  // ----------------------------------------------------
  // DATA HELPERS
  // ----------------------------------------------------

  const currentMonthKey = months[selectedMonth].toLowerCase();
  
  const filteredSeasonality = seasonality.filter(dest => {
    if (filterType !== 'ALL' && dest.type !== filterType) return false;
    if (searchTerm && !dest.destinationName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return dest.status !== 'ARCHIVED'; // Hide archived by default
  });

  const peakDestinations = filteredSeasonality.filter(d => d.monthly[currentMonthKey] === 'Peak');
  const goodDestinations = filteredSeasonality.filter(d => d.monthly[currentMonthKey] === 'Good');
  const offDestinations = filteredSeasonality.filter(d => d.monthly[currentMonthKey] === 'Off');

  const getMonthEvents = (monthIdx) => {
    return festivals.filter(f => {
      const d = new Date(f.startDate);
      return d.getMonth() === monthIdx && d.getFullYear() === selectedYear;
    });
  };

  const currentMonthEvents = getMonthEvents(selectedMonth);

  const getMonthPlans = (monthIdx) => {
    return plans.filter(p => {
      if (!p.departureDate) return false;
      const d = new Date(p.departureDate);
      return d.getMonth() === monthIdx && d.getFullYear() === selectedYear;
    });
  };

  const currentMonthPlans = getMonthPlans(selectedMonth);
  const confirmedPlans = currentMonthPlans.filter(p => p.status === 'Confirmed');
  const expectedPlans = currentMonthPlans.filter(p => p.status === 'Expected');
  const proposedPlans = currentMonthPlans.filter(p => p.status === 'Proposed');

  // ----------------------------------------------------
  // RENDER COMPONENTS
  // ----------------------------------------------------

  const renderStatusDot = (status) => {
    if (status === 'Confirmed') return '🟢';
    if (status === 'Expected') return '🔵';
    return '⚪';
  };

  const renderSeasonIcon = (season) => {
    if (season === 'Peak') return '🟢';
    if (season === 'Good') return '🟡';
    return '🔴';
  };

  const DestinationCard = ({ dest }) => (
    <div className="card" style={{ marginBottom: '1rem', cursor: 'pointer', transition: 'transform 0.1s', position: 'relative' }} onClick={() => setSelectedDestination(dest)}>
      <div style={{ padding: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{dest.destinationName}</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            {dest.type === 'INTERNATIONAL' ? 'Int' : 'Dom'}
          </span>
        </h4>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontStyle: 'italic' }}>
          Why: {dest.notes || 'Reason not configured'}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
          Season: {dest.bestTravelWindow || 'Unknown'}
        </div>
      </div>
    </div>
  );

  const MonthView = () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {/* LEFT COL: SEASONALITY */}
      <div style={{ flex: '1 1 65%' }}>
        
        {/* SUMMARY HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(76, 175, 80, 0.05)', border: '1px solid rgba(76, 175, 80, 0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-color)' }}>{peakDestinations.length}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--success-color)' }}>PEAK DESTINATIONS</div>
          </div>
          <div style={{ background: 'rgba(255, 193, 7, 0.05)', border: '1px solid rgba(255, 193, 7, 0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning-color)' }}>{goodDestinations.length}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--warning-color)' }}>GOOD DESTINATIONS</div>
          </div>
          <div style={{ background: 'rgba(244, 67, 54, 0.05)', border: '1px solid rgba(244, 67, 54, 0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger-color)' }}>{offDestinations.length}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--danger-color)' }}>OFF DESTINATIONS</div>
          </div>
        </div>

        {/* DESTINATION COLUMNS */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          
          {/* PEAK */}
          <div>
            <div style={{ borderBottom: '2px solid var(--success-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--success-color)' }}>🟢 PEAK</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Best destinations this month</p>
            </div>
            {peakDestinations.map(d => <DestinationCard key={d.id} dest={d} />)}
            {peakDestinations.length === 0 && <div className="text-secondary" style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>No peak destinations.</div>}
          </div>

          {/* GOOD */}
          <div>
            <div style={{ borderBottom: '2px solid var(--warning-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--warning-color)' }}>🟡 GOOD</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Suitable destinations</p>
            </div>
            {goodDestinations.map(d => <DestinationCard key={d.id} dest={d} />)}
            {goodDestinations.length === 0 && <div className="text-secondary" style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>No good destinations.</div>}
          </div>

          {/* OFF */}
          <div>
            <div style={{ borderBottom: '2px solid var(--danger-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--danger-color)' }}>🔴 OFF</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Less suitable destinations</p>
            </div>
            {offDestinations.map(d => <DestinationCard key={d.id} dest={d} />)}
            {offDestinations.length === 0 && <div className="text-secondary" style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>No off destinations.</div>}
          </div>
        </div>
      </div>

      {/* RIGHT COL: TOURS & EVENTS */}
      <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* GO CAMP FLY TOURS */}
        <div className="card">
          <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>GO CAMP FLY TOURS</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tours scheduled for {fullMonths[selectedMonth]}</p>
          </div>
          <div className="card-body" style={{ padding: '1rem' }}>
            
            {/* CONFIRMED */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Confirmed</h4>
              {confirmedPlans.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>None</p> : (
                confirmedPlans.map(p => {
                  const t = tours.find(x => x.id === p.tourId);
                  return (
                    <div key={p.id} style={{ fontSize: '0.9rem', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--success-color)' }}>
                      <div style={{ fontWeight: 600 }}>{t?.name || 'Unknown Tour'}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {p.departureDate ? new Date(p.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'TBD'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* EXPECTED */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Expected</h4>
              {expectedPlans.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>None</p> : (
                expectedPlans.map(p => {
                  const t = tours.find(x => x.id === p.tourId);
                  return (
                    <div key={p.id} style={{ fontSize: '0.9rem', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
                      <div style={{ fontWeight: 500 }}>{t?.name || 'Unknown Tour'}</div>
                    </div>
                  );
                })
              )}
            </div>

            {/* PROPOSED */}
            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Proposed</h4>
              {proposedPlans.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>None</p> : (
                proposedPlans.map(p => {
                  const t = tours.find(x => x.id === p.tourId);
                  return (
                    <div key={p.id} style={{ fontSize: '0.9rem', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--warning-color)' }}>
                      <div style={{ fontWeight: 500 }}>{t?.name || 'Unknown Tour'}</div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* TRAVEL EVENTS */}
        <div className="card">
          <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', background: 'var(--bg-color)' }}>
            <h3 style={{ margin: 0 }}>TRAVEL EVENTS</h3>
          </div>
          <div className="card-body" style={{ padding: '1rem' }}>
            {currentMonthEvents.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>No major configured travel events this month.</p>
            ) : (
              currentMonthEvents.map(e => (
                <div key={e.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{e.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {new Date(e.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    <span style={{ background: 'var(--surface-color)', padding: '2px 6px', borderRadius: '4px' }}>{e.eventType}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );

  const MatrixView = () => (
    <div className="card" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: 'var(--surface-color)', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem', minWidth: '150px' }}>Destination</th>
            {months.map(m => <th key={m} style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredSeasonality.map(dest => (
            <tr key={dest.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                {dest.destinationName}
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{dest.type}</div>
              </td>
              {months.map(m => {
                const s = dest.monthly[m.toLowerCase()] || 'Off';
                return (
                  <td key={m} style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <div 
                      style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                        background: s === 'Peak' ? 'rgba(76, 175, 80, 0.1)' : s === 'Good' ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                        color: s === 'Peak' ? 'var(--success-color)' : s === 'Good' ? 'var(--warning-color)' : 'var(--text-tertiary)'
                      }}
                      onClick={() => {
                          setSelectedMonth(months.indexOf(m)); 
                          setSelectedDestination(dest);
                      }}
                    >
                      {s}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <ToursLayout 
      title="Operations Tour Calendar" 
      subtitle="Understand where to travel, when to travel, and which GoCampFly tours are coming."
    >
      {/* TOP CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* VIEW SELECTOR */}
        <div style={{ display: 'flex', background: 'var(--surface-color)', borderRadius: '8px', padding: '4px' }}>
          <button className={`btn ${activeView === 'MONTH' ? 'btn-primary' : 'btn-outline'}`} style={{ border: 'none' }} onClick={() => setActiveView('MONTH')}>
            <CalendarDays size={16} style={{ marginRight: '6px' }}/> Month View
          </button>
          <button className={`btn ${activeView === 'MATRIX' ? 'btn-primary' : 'btn-outline'}`} style={{ border: 'none' }} onClick={() => setActiveView('MATRIX')}>
            <Table size={16} style={{ marginRight: '6px' }}/> Matrix View
          </button>
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-box" style={{ position: 'relative', width: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search destination..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '32px', width: '100%', fontSize: '0.85rem' }}
            />
          </div>
          <select className="form-control" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ fontSize: '0.85rem' }}>
            <option value="ALL">All Types</option>
            <option value="DOMESTIC">Domestic</option>
            <option value="INTERNATIONAL">International</option>
          </select>
          <button 
            className="btn btn-primary"
            style={{ fontSize: '0.9rem', fontWeight: 'bold' }} 
            onClick={() => setIsEditMode(true)}
          >
            <Edit size={16} style={{ marginRight: '4px' }}/> Edit Calendar Data
          </button>
        </div>
      </div>

      {/* MONTH SELECTOR */}
      {activeView === 'MONTH' && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>{selectedYear}</h2>
          </div>
          <div style={{ display: 'flex', background: 'var(--surface-color)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            {months.map((m, i) => (
              <button 
                key={m} 
                style={{ 
                  flex: 1, padding: '0.75rem 0', border: 'none', cursor: 'pointer', fontWeight: 600,
                  background: selectedMonth === i ? 'var(--primary-color)' : 'transparent',
                  color: selectedMonth === i ? '#fff' : 'var(--text-secondary)',
                  borderRight: i < 11 ? '1px solid var(--border-color)' : 'none'
                }}
                onClick={() => setSelectedMonth(i)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RENDER ACTIVE VIEW */}
      {activeView === 'MONTH' && <MonthView />}
      {activeView === 'MATRIX' && <MatrixView />}

      {/* DESTINATION DETAIL MODAL */}
      {selectedDestination && !isEditMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--bg-color)', borderRadius: '8px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)' }}>
              <div>
                <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>{selectedDestination.destinationName}</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedDestination.type}</div>
              </div>
              <button className="btn btn-outline" onClick={() => setSelectedDestination(null)}><X size={16} /></button>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>DESTINATION SEASON</h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', 
                    color: selectedDestination.monthly[currentMonthKey] === 'Peak' ? 'var(--success-color)' : selectedDestination.monthly[currentMonthKey] === 'Good' ? 'var(--warning-color)' : 'var(--danger-color)'
                  }}>
                    {renderSeasonIcon(selectedDestination.monthly[currentMonthKey])} {selectedDestination.monthly[currentMonthKey]} in {fullMonths[selectedMonth]}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>WHY</strong>
                    <p style={{ marginTop: '0.25rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>{selectedDestination.notes || 'No reason configured.'}</p>
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>GO CAMP FLY</h3>
                  {currentMonthPlans.filter(p => tours.find(t => t.id === p.tourId)?.destination.toLowerCase().includes(selectedDestination.destinationName.toLowerCase())).length === 0 ? (
                    <p className="text-secondary" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>No tours scheduled for this destination in {fullMonths[selectedMonth]}.</p>
                  ) : (
                    currentMonthPlans.filter(p => tours.find(t => t.id === p.tourId)?.destination.toLowerCase().includes(selectedDestination.destinationName.toLowerCase())).map(p => {
                      const t = tours.find(x => x.id === p.tourId);
                      return (
                        <div key={p.id} style={{ marginBottom: '1rem' }}>
                          <div style={{ fontWeight: 600 }}>{t.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {renderStatusDot(p.status)} <strong style={{color: 'var(--text-primary)'}}>{p.status}</strong> 
                            {p.departureDate ? ` — ${new Date(p.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>YEAR AT A GLANCE</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {months.map(m => (
                    <div key={m}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '4px' }}>{m}</div>
                      <div style={{ 
                        fontSize: '0.75rem', padding: '0.5rem 0', borderRadius: '4px', fontWeight: 600,
                        background: selectedDestination.monthly[m.toLowerCase()] === 'Peak' ? 'rgba(76, 175, 80, 0.1)' : selectedDestination.monthly[m.toLowerCase()] === 'Good' ? 'rgba(255, 193, 7, 0.1)' : 'var(--surface-color)',
                        color: selectedDestination.monthly[m.toLowerCase()] === 'Peak' ? 'var(--success-color)' : selectedDestination.monthly[m.toLowerCase()] === 'Good' ? 'var(--warning-color)' : 'var(--text-secondary)'
                      }}>
                        {selectedDestination.monthly[m.toLowerCase()]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditMode && (
        <CalendarEditor 
          destinations={seasonality}
          onClose={() => setIsEditMode(false)}
          onRefresh={loadData}
        />
      )}

    </ToursLayout>
  );
};

export default OperationsCalendar;
