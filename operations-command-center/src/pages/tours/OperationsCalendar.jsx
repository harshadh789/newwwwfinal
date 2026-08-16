import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { MapPin, CalendarDays, Search, X, Plus, Calendar as CalendarIcon, Clock, Save, Edit2 } from 'lucide-react';

const OperationsCalendar = () => {
  const { session } = useAuth();
  const isAdmin = session?.role === 'ADMIN' || session?.role === 'OPERATIONS';

  // Core State
  const [activeView, setActiveView] = useState('KANBAN'); // KANBAN, MATRIX
  const [selectedMonth, setSelectedMonth] = useState(7); // August
  const [selectedYear, setSelectedYear] = useState(2026);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data State
  const [tours, setTours] = useState([]);
  const [seasonality, setSeasonality] = useState([]);
  const [festivals, setFestivals] = useState([]);
  
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  
  // Matrix inline edit state
  const [editingMatrixDestId, setEditingMatrixDestId] = useState(null);
  const [inlineMonthlyData, setInlineMonthlyData] = useState({});

  // Form state
  const [newDestName, setNewDestName] = useState('');
  const [newDestNotes, setNewDestNotes] = useState('');
  const [newDestWindow, setNewDestWindow] = useState('');
  
  const defaultMonthly = {
    jan: 'Off', feb: 'Off', mar: 'Off', apr: 'Off', may: 'Off', jun: 'Off',
    jul: 'Off', aug: 'Off', sep: 'Off', oct: 'Off', nov: 'Off', dec: 'Off'
  };
  const [monthlyData, setMonthlyData] = useState(defaultMonthly);
  
  const openAddModal = () => {
    setNewDestName('');
    setNewDestNotes('');
    setNewDestWindow('');
    setMonthlyData(defaultMonthly);
    setIsAddMode(true);
  };
  
  const openDestModal = (dest) => {
    setSelectedDestination(dest);
    setMonthlyData(dest.monthly || defaultMonthly);
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Generate years from 2024 to 2035
  const yearsList = Array.from({ length: 12 }, (_, i) => 2024 + i);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const t = await dataService.getTours();
    const s = await dataService.getSeasonality();
    const f = await dataService.getFestivals();
    const scheduled = await dataService.getOperationsPlans();
    
    setTours(t || []);
    const validSeasonality = (s || []).filter(d => d.status !== 'ARCHIVED');
    setSeasonality(validSeasonality);
    setFestivals(f || []);
    setScheduledTours(scheduled || []);
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    await dataService.addDestination({
      destinationName: newDestName,
      notes: newDestNotes,
      bestTravelWindow: newDestWindow,
      seasonClass: Object.values(monthlyData).includes('Peak') ? 'Peak' : 'Good',
      monthly: monthlyData
    });
    setIsAddMode(false);
    setNewDestName('');
    setNewDestNotes('');
    setNewDestWindow('');
    loadData();
  };
  
  const filteredSeasonality = seasonality.filter(dest => {
    if (filterType !== 'ALL' && dest.type !== filterType) return false;
    if (searchTerm && !dest.destinationName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getProposedToursForDest = (destId) => {
    return tours.filter(t => t.destination === destId || t.destination === destId.destinationName || t.destinationId === destId);
  };

  const KanbanView = () => {
    const currentMonthIdx = new Date().getMonth();
    const monthsArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    const destsWithUpcoming = filteredSeasonality.map(dest => {
      let upcoming = null;
      for (let i = 0; i < 12; i++) {
        const checkIdx = (currentMonthIdx + i) % 12;
        const mKey = monthsArr[checkIdx];
        const s = dest.monthly?.[mKey];
        if (s === 'Peak' || s === 'Good') {
          let category = 'Within 12 Months';
          if (i <= 3) category = 'Within 3 Months';
          else if (i <= 6) category = 'Within 6 Months';
          
          upcoming = {
            season: s,
            monthsAway: i,
            daysAway: i === 0 ? 'Currently Active' : `${i * 30} days`,
            category
          };
          break;
        }
      }
      return { ...dest, upcoming };
    }).filter(d => d.upcoming); // only show those with upcoming seasons

    const within3 = destsWithUpcoming.filter(d => d.upcoming.category === 'Within 3 Months').sort((a,b) => a.upcoming.monthsAway - b.upcoming.monthsAway);
    const within6 = destsWithUpcoming.filter(d => d.upcoming.category === 'Within 6 Months').sort((a,b) => a.upcoming.monthsAway - b.upcoming.monthsAway);
    const within12 = destsWithUpcoming.filter(d => d.upcoming.category === 'Within 12 Months').sort((a,b) => a.upcoming.monthsAway - b.upcoming.monthsAway);

    const renderColumn = (title, items, color, bgGradient) => (
      <div style={{ background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', background: bgGradient, borderBottom: '1px solid var(--glass-border)' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '0.02em' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={18} style={{ color }} /> {title}</span>
            <span style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{items.length}</span>
          </h3>
        </div>
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }} className="animate-slide-up">
          {items.map(dest => (
            <div 
              key={dest.id} 
              onClick={() => openDestModal(dest)}
              className="card card-hover" 
              style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid var(--glass-border)', background: 'var(--bg-color)', transition: 'all 0.3s ease' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '8px', background: `rgba(${color === '#FF4D4D' ? '255,77,77' : color === '#FFB347' ? '255,179,71' : '0,230,230'}, 0.1)`, borderRadius: '8px', color }}>
                  <MapPin size={20} className="glow-icon" />
                </div>
                <strong style={{ fontSize: '1.15rem', color: '#fff', letterSpacing: '0.01em' }}>{dest.destinationName}</strong>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ color: '#fff' }}>
                  <strong style={{ color: dest.upcoming.season === 'Peak' ? '#FF4D4D' : '#FFB347' }}>{dest.upcoming.season} season</strong> starts in {dest.upcoming.daysAway}
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '3rem 0', fontStyle: 'italic', fontSize: '0.9rem' }}>No destinations in this timeframe.</div>}
        </div>
      </div>
    );

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
        {renderColumn('Within 3 Months', within3, '#FF4D4D', 'linear-gradient(135deg, rgba(255, 77, 77, 0.2) 0%, rgba(255, 77, 77, 0.05) 100%)')}
        {renderColumn('Within 6 Months', within6, '#FFB347', 'linear-gradient(135deg, rgba(255, 179, 71, 0.2) 0%, rgba(255, 179, 71, 0.05) 100%)')}
        {renderColumn('Within 12 Months', within12, '#00E6E6', 'linear-gradient(135deg, rgba(0, 230, 230, 0.2) 0%, rgba(0, 230, 230, 0.05) 100%)')}
      </div>
    );
  };


  const handleInlineSave = async (e, dest) => {
    e.stopPropagation();
    const newClass = Object.values(inlineMonthlyData).includes('Peak') ? 'Peak' : 'Good';
    await dataService.updateSeasonality(dest.id, { monthly: inlineMonthlyData, seasonClass: newClass });
    setEditingMatrixDestId(null);
    loadData();
  };

  const MatrixView = () => {
    const dataToRender = filteredSeasonality;
    
    return (
      <div className="table-container animate-slide-up" style={{ marginTop: '2rem', overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
          <thead>
            <tr>
              <th style={{ position: 'sticky', left: 0, background: 'var(--surface-color)', zIndex: 10, width: '250px' }}>Destination</th>
              {months.map(m => <th key={m} style={{ textAlign: 'center', minWidth: '60px' }}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataToRender.map(dest => {
              const isEditing = editingMatrixDestId === dest.id;
              
              return (
                <tr key={dest.id} style={{ cursor: isEditing ? 'default' : 'pointer', transition: 'background 0.2s' }} onClick={() => !isEditing && openDestModal(dest)}>
                  <td style={{ position: 'sticky', left: 0, background: 'var(--surface-color)', zIndex: 10, fontWeight: 600, color: '#fff', borderRight: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{dest.destinationName}</span>
                      {isAdmin && (
                        isEditing ? (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={(e) => handleInlineSave(e, dest)}>Save</button>
                            <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.7rem' }} onClick={(e) => { e.stopPropagation(); setEditingMatrixDestId(null); }}>Cancel</button>
                          </div>
                        ) : (
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '2px 8px', fontSize: '0.7rem', border: 'none' }}
                            onClick={(e) => { e.stopPropagation(); setEditingMatrixDestId(dest.id); setInlineMonthlyData(dest.monthly); }}
                          >
                            <Edit2 size={12} /> Edit
                          </button>
                        )
                      )}
                    </div>
                  </td>
                  {months.map(m => {
                    const mKey = m.toLowerCase();
                    const s = isEditing ? inlineMonthlyData[mKey] : dest.monthly[mKey];
                    return (
                      <td 
                        key={m} 
                        style={{ textAlign: 'center', padding: isEditing ? '0.5rem' : '1.25rem 1rem' }}
                      >
                        {isEditing ? (
                          <select 
                            className="form-control"
                            value={s}
                            onChange={(e) => setInlineMonthlyData({ ...inlineMonthlyData, [mKey]: e.target.value })}
                            style={{ padding: '2px', fontSize: '0.75rem', width: '100%', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Peak">PEAK</option>
                            <option value="Good">GOOD</option>
                            <option value="Off">OFF</option>
                          </select>
                        ) : (
                          s === 'Peak' ? <span className="pill pill-danger" style={{ fontSize: '10px' }}>PEAK</span> : 
                          s === 'Good' ? <span className="pill pill-warning" style={{ fontSize: '10px' }}>GOOD</span> : 
                          <span className="pill pill-secondary" style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-tertiary)' }}>OFF</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <ToursLayout 
      title={<span className="text-gradient">Operations Tour Calendar</span>}
      subtitle="Manage destinations and their seasonal classifications dynamically."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '44px', background: 'rgba(255,255,255,0.03)' }}
            />
          </div>
          
          <select className="form-control" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} style={{ width: '120px' }}>
            {yearsList.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          
          <select className="form-control" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} style={{ width: '160px' }}>
            {fullMonths.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>

          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <button 
              className={`btn ${activeView === 'KANBAN' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px' }} 
              onClick={() => setActiveView('KANBAN')}
            >
              Kanban
            </button>
            <button 
              className={`btn ${activeView === 'MATRIX' ? 'btn-primary' : 'btn-outline'}`} 
              style={{ border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px' }} 
              onClick={() => setActiveView('MATRIX')}
            >
              Matrix
            </button>
          </div>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '1rem' }}>

            <button className="btn btn-primary" onClick={openAddModal}>
              <Plus size={18} /> Add Destination
            </button>
          </div>
        )}
      </div>

      {activeView === 'KANBAN' && <KanbanView />}
      {activeView === 'MATRIX' && <MatrixView />}

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedDestination(null); }}>
          <div className="modal-content card" style={{ maxWidth: '800px', padding: '0', background: 'var(--surface-color)', border: '1px solid var(--glass-border)' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <span className={`pill pill-${selectedDestination.seasonClass === 'Peak' ? 'danger' : selectedDestination.seasonClass === 'Good' ? 'warning' : 'primary'}`} style={{ marginBottom: '1rem' }}>
                  {selectedDestination.seasonClass} Season
                </span>
                <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.02em' }}>
                  <MapPin size={28} className="glow-icon" style={{ color: 'var(--primary-color)' }} /> {selectedDestination.destinationName}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => { setSelectedDestination(null); }} className="btn-secondary" style={{ padding: '0.75rem', borderRadius: '50%' }}>
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>Applicable Months</h4>
                  <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500 }}>
                    {Object.entries(selectedDestination.monthly || {}).filter(([m, v]) => v === selectedDestination.seasonClass).map(([m]) => m.toUpperCase()).join(', ') || 'N/A'}
                  </div>
                </div>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>Recommended Travel Period</h4>
                  <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500 }}>
                    {selectedDestination.bestTravelWindow || 'Year-round depending on preference'}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Proposed Tour Titles</h4>
                  <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1.25rem', borderRadius: '12px', minHeight: '120px' }}>
                    {getProposedToursForDest(selectedDestination.destinationName).length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {getProposedToursForDest(selectedDestination.destinationName).map(t => (
                          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <strong style={{ color: '#fff' }}>{t.name}</strong> 
                            <span className="pill pill-primary" style={{ fontSize: '0.65rem' }}>{t.lifecycleStage || 'PLANNING'}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No tours proposed yet.</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Scheduled Tours</h4>
                  <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1.25rem', borderRadius: '12px', minHeight: '120px' }}>
                    {scheduledTours.filter(op => op.tourName && op.tourName.toLowerCase().includes(selectedDestination.destinationName.toLowerCase())).length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {scheduledTours.filter(op => op.tourName && op.tourName.toLowerCase().includes(selectedDestination.destinationName.toLowerCase())).map(op => (
                          <div key={op.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <strong style={{ color: '#fff' }}>{op.tourName}</strong> 
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><CalendarIcon size={12} style={{ display: 'inline', marginRight: '4px' }}/>{op.startDate}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No scheduled tours yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {isAddMode && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsAddMode(false); }}>
          <div className="modal-content card" style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>Add New Destination</h2>
              <button onClick={() => setIsAddMode(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1.5rem' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddDestination}>
              <div className="form-group">
                <label className="form-label">Destination Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newDestName} 
                  onChange={e => setNewDestName(e.target.value)} 
                  required 
                  autoFocus
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Season Matrix *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  {months.map(m => {
                    const mKey = m.toLowerCase();
                    return (
                      <div key={m} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{m}</label>
                        <select 
                          className="form-control"
                          value={monthlyData[mKey]}
                          onChange={e => setMonthlyData({ ...monthlyData, [mKey]: e.target.value })}
                          style={{ padding: '0.4rem', fontSize: '0.8rem', textAlign: 'center' }}
                        >
                          <option value="Peak">PEAK</option>
                          <option value="Good">GOOD</option>
                          <option value="Off">OFF</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Recommended Travel Window</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. October - March"
                  value={newDestWindow} 
                  onChange={e => setNewDestWindow(e.target.value)} 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Basic Notes</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Any operational guidelines for this destination..."
                  value={newDestNotes} 
                  onChange={e => setNewDestNotes(e.target.value)} 
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddMode(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}



    </ToursLayout>
  );
};

export default OperationsCalendar;
