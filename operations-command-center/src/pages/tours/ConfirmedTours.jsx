import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { CheckSquare, Calendar, Users, IndianRupee, AlertCircle, CheckCircle2, Clock, Eye } from 'lucide-react';

const ConfirmedTours = () => {
  const { session } = useAuth();
  const [confirmedTours, setConfirmedTours] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allCT = await dataService.getConfirmedTours();
    const allTours = await dataService.getTours();
    setConfirmedTours(allCT || []);
    setTours(allTours || []);
  };

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(session?.role);

  // Group by timeframe
  const now = new Date();
  
  const getDaysDiff = (dateStr) => {
    if (!dateStr) return 999;
    const d = new Date(dateStr);
    return Math.floor((d - now) / (1000 * 60 * 60 * 24));
  };

  const groups = {
    next30: confirmedTours.filter(t => getDaysDiff(t.departureDate) >= 0 && getDaysDiff(t.departureDate) <= 30),
    next60: confirmedTours.filter(t => getDaysDiff(t.departureDate) > 30 && getDaysDiff(t.departureDate) <= 60),
    next90: confirmedTours.filter(t => getDaysDiff(t.departureDate) > 60 && getDaysDiff(t.departureDate) <= 90),
    next6M: confirmedTours.filter(t => getDaysDiff(t.departureDate) > 90 && getDaysDiff(t.departureDate) <= 180),
  };

  const renderReadiness = (status) => {
    switch(status) {
      case 'Ready': return <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14}/> Ready</span>;
      case 'Preparing': return <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> Preparing</span>;
      case 'Watch': return <span style={{ color: 'var(--warning-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14}/> Watch</span>;
      default: return <span style={{ color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14}/> Not Ready</span>;
    }
  };

  const ConfirmedTourCard = ({ ct }) => {
    const tourInfo = tours.find(t => t.id === ct.tourId) || {};
    
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-color)' }}>{tourInfo.name || 'Unknown Tour'}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tourInfo.destination || 'Unknown Destination'}</p>
          </div>
          <span className="status-badge status-active">{ct.status || 'CONFIRMED'}</span>
        </div>
        <div className="card-body" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }}/> DATES</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              {new Date(ct.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - {new Date(ct.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}><Users size={12} style={{ display: 'inline', marginRight: '4px' }}/> CUSTOMERS</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{ct.expectedCustomers} Expected</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}><IndianRupee size={12} style={{ display: 'inline', marginRight: '2px' }}/> EXPECTED REVENUE</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>₹{ct.expectedRevenue?.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}><IndianRupee size={12} style={{ display: 'inline', marginRight: '2px' }}/> EXPECTED PROFIT</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--success-color)' }}>₹{ct.expectedProfit?.toLocaleString()} ({ct.expectedMargin}%)</div>
          </div>
        </div>
        <div className="card-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {renderReadiness(ct.operationsReadiness)}
          </div>
          {isOpsOrAdmin && (
            <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit Plan</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <ToursLayout 
      title="Confirmed Tours" 
      subtitle="Actual upcoming tour departures that are confirmed and require operational preparation."
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        {isOpsOrAdmin && (
          <button className="btn btn-primary" onClick={() => alert('Add Confirmed Tour flow.')}>
            Add Confirmed Tour
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <section>
          <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>NEXT 30 DAYS</h2>
          {groups.next30.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <p className="text-secondary" style={{ margin: 0, fontStyle: 'italic' }}>No confirmed upcoming tours in this window.</p>
            </div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {groups.next30.map(ct => <ConfirmedTourCard key={ct.id} ct={ct} />)}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>NEXT 60 DAYS</h2>
          {groups.next60.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <p className="text-secondary" style={{ margin: 0, fontStyle: 'italic' }}>No confirmed upcoming tours in this window.</p>
            </div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {groups.next60.map(ct => <ConfirmedTourCard key={ct.id} ct={ct} />)}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>NEXT 90 DAYS</h2>
          {groups.next90.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <p className="text-secondary" style={{ margin: 0, fontStyle: 'italic' }}>No confirmed upcoming tours in this window.</p>
            </div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {groups.next90.map(ct => <ConfirmedTourCard key={ct.id} ct={ct} />)}
            </div>
          )}
        </section>
      </div>

    </ToursLayout>
  );
};

export default ConfirmedTours;
