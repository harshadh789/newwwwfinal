const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import ToursLayout from './ToursLayout';
import { MapPin, CalendarDays, Search, X } from 'lucide-react';

const OperationsCalendar = () => {
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDest, setSelectedDest] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await dataService.getSeasonality();
    const t = await dataService.getTours();
    const ev = await dataService.getCalendarEvents();
    setDestinations((s || []).filter(d => d.status !== 'ARCHIVED'));
    setTours(t || []);
    setEvents(ev || []);
  };

  const filteredDests = destinations.filter(d => 
    !searchTerm || d.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const peakDests = filteredDests.filter(d => d.seasonClass === 'Peak');
  const goodDests = filteredDests.filter(d => d.seasonClass === 'Good');
  const offDests = filteredDests.filter(d => d.seasonClass === 'Off');

  const getProposedToursForDest = (destId) => {
    // Both tour.destination and tour.destinationId could be used to link.
    // For simplicity, we just check if tour.destination string matches destinationName.
    return tours.filter(t => t.destination === destId || t.destination === destId.destinationName || t.destinationId === destId);
  };

  const renderColumn = (title, items, color, bg) => (
    <div style={{ background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: bg, borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color, display: 'flex', justifyContent: 'space-between' }}>
          {title} <span style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{items.length}</span>
        </h3>
      </div>
      <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map(dest => (
          <div 
            key={dest.id} 
            onClick={() => setSelectedDest(dest)}
            className="card hover-lift" 
            style={{ padding: '1rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-color)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <MapPin size={16} color={color} />
              <strong style={{ fontSize: '1.1rem' }}>{dest.destinationName}</strong>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong>Best Time:</strong> {dest.bestTravelWindow || 'Unknown'}
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0', fontStyle: 'italic' }}>No destinations</div>}
      </div>
    </div>
  );

  return (
    <ToursLayout 
      title="Operations Tour Calendar" 
      subtitle="Manage destinations and their seasonal classifications."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-tertiary)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search destinations..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {renderColumn('Peak Season', peakDests, '#EF4444', 'rgba(239, 68, 68, 0.1)')}
        {renderColumn('Good Season', goodDests, '#F59E0B', 'rgba(245, 158, 11, 0.1)')}
        {renderColumn('Off Season', offDests, '#60A5FA', 'rgba(59, 130, 246, 0.1)')}
      </div>

      {selectedDest && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {selectedDest.seasonClass} Season
                </span>
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={24} /> {selectedDest.destinationName}
                </h2>
              </div>
              <button onClick={() => setSelectedDest(null)} className="btn-secondary" style={{ padding: '0.5rem' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Applicable Months</h4>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                    {Object.entries(selectedDest.monthly || {}).filter(([m, v]) => v === selectedDest.seasonClass).map(([m]) => m.toUpperCase()).join(', ') || 'N/A'}
                  </div>
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Recommended Travel Period</h4>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                    {selectedDest.bestTravelWindow || 'Year-round depending on preference'}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Proposed Tour Titles</h4>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                  {getProposedToursForDest(selectedDest.destinationName).length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {getProposedToursForDest(selectedDest.destinationName).map(t => (
                        <li key={t.id} style={{ marginBottom: '0.25rem' }}>
                          <strong>{t.name}</strong> 
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '8px' }}>({t.lifecycleStage || 'PLANNING'})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>No tours proposed yet. Create them in the Festival & Holiday Calendar.</span>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Relevant Festivals & Holidays</h4>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                  {events.filter(e => (e.destinationIds || []).includes(selectedDest.destinationId || selectedDest.id)).length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                      {events.filter(e => (e.destinationIds || []).includes(selectedDest.destinationId || selectedDest.id)).map(e => (
                        <li key={e.id} style={{ marginBottom: '0.25rem' }}>
                          <strong>{e.name}</strong> 
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '8px' }}>({e.startDate})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>No linked festivals found.</span>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default OperationsCalendar;
`;

fs.writeFileSync('src/pages/tours/OperationsCalendar.jsx', content);
