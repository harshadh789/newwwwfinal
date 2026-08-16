import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { CheckCircle2, Clock, Eye, AlertCircle, MapPin } from 'lucide-react';

const ScheduledTours = () => {
  const { session } = useAuth();
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  
  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('tourUpdated', handleUpdate);
    return () => window.removeEventListener('tourUpdated', handleUpdate);
  }, []);

  const loadData = async () => {
    const allTours = await dataService.getTours();
    setTours(allTours || []);
  };

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(session?.role);

  const scheduledTours = tours.filter(t => t.lifecycleStage === 'SCHEDULED');

  const now = new Date();

  const renderReadiness = (tour) => {
    // Determine readiness based on fields or default to Preparing
    const status = tour.operations?.capacityLevel === 'High' ? 'Ready' : 'Preparing';
    switch(status) {
      case 'Ready': return <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14}/> Ready</span>;
      case 'Preparing': return <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> Preparing</span>;
      case 'Watch': return <span style={{ color: 'var(--warning-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14}/> Watch</span>;
      default: return <span style={{ color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14}/> Not Ready</span>;
    }
  };

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  const TableSection = ({ title, data }) => (
    <div style={{ marginBottom: '3rem' }} className="animate-slide-up">
      <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#fff' }}>{title}</h2>
      {data.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <p className="text-secondary" style={{ margin: 0, fontStyle: 'italic' }}>No confirmed upcoming tours in this window.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table" style={{ width: '100%', minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: '30%' }}>Tour & Destination</th>
                <th style={{ textAlign: 'center' }}>Travel Date</th>
                <th style={{ textAlign: 'center' }}>Target Bookings</th>
                <th style={{ textAlign: 'right' }}>Expected Revenue</th>
                <th style={{ textAlign: 'center' }}>Readiness</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(tour => (
                <tr key={tour.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', marginBottom: '4px' }}>{tour.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> {tour.destination}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}><span className="pill pill-primary" style={{ fontSize: '0.75rem' }}>{tour.travelDate}</span></td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{tour.sales?.targetCustomers || '-'}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: '#00E676' }}>{formatINR(tour.finance?.plannedRevenue)}</td>
                  <td style={{ textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center' }}>{renderReadiness(tour)}</div></td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      onClick={() => setSelectedTour(tour)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <ToursLayout 
      title={<span className="text-gradient">Scheduled Tours</span>}
      subtitle="Actual upcoming tour departures that are approved and require operational preparation."
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TableSection title="ALL SCHEDULED TOURS" data={scheduledTours} />
      </div>

      {selectedTour && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedTour(null); }}>
          <div className="modal-content card animate-scale-in" style={{ maxWidth: '600px', padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>{selectedTour.name}</h2>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <MapPin size={14}/> {selectedTour.destination}
                </div>
              </div>
              <button onClick={() => setSelectedTour(null)} className="btn-secondary" style={{ padding: '0.5rem' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Travel Dates</div>
                <div style={{ color: '#fff', fontWeight: 500 }}>{selectedTour.startDate} to {selectedTour.endDate}</div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Lifecycle Stage</div>
                <div style={{ color: '#fff', fontWeight: 500 }}>{selectedTour.lifecycleStage}</div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Target Bookings</div>
                <div style={{ color: '#fff', fontWeight: 500 }}>{selectedTour.sales?.targetCustomers || '-'} Pax</div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Expected Revenue</div>
                <div style={{ color: '#00E676', fontWeight: 700 }}>{formatINR(selectedTour.finance?.plannedRevenue)}</div>
              </div>

              {selectedTour.notes && (
                <div style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Notes</div>
                  <div style={{ color: '#fff' }}>{selectedTour.notes}</div>
                </div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setSelectedTour(null)} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </ToursLayout>
  );
};

export default ScheduledTours;
