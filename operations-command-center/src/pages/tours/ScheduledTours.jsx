import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { CheckCircle2, Clock, Eye, AlertCircle, MapPin } from 'lucide-react';

const ScheduledTours = () => {
  const { session } = useAuth();
  const [tours, setTours] = useState([]);
  
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
                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View Details</button>
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
    </ToursLayout>
  );
};

export default ScheduledTours;
