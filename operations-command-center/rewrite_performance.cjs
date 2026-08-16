const fs = require('fs');

const content = `import React, { useState } from 'react';
import ToursLayout from './ToursLayout';
import { TrendingUp, FileText, CheckCircle, Plus, X, Zap } from 'lucide-react';

const OpsSalesPerformance = () => {
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'weekly'
  const [isLoggingMode, setIsLoggingMode] = useState(false);
  const [logForm, setLogForm] = useState({ action: 'Proposal Shared', tour: '', dest: '' });

  // Stateful mock data for now
  const [performanceData, setPerformanceData] = useState({
    daily: {
      proposalsShared: 5,
      confirmedBookings: 2,
      conversionRate: '40%',
      recentActivity: [
        { id: 1, time: '10:30 AM', action: 'Proposal Shared', tour: 'Kashmir Family Tour', dest: 'Kashmir' },
        { id: 2, time: '11:15 AM', action: 'Booking Confirmed', tour: 'Goa Weekend Getaway', dest: 'Goa' },
        { id: 3, time: '02:00 PM', action: 'Proposal Shared', tour: 'Kerala Backwaters', dest: 'Kerala' },
        { id: 4, time: '04:45 PM', action: 'Booking Confirmed', tour: 'Kashmir Family Tour', dest: 'Kashmir' },
      ]
    },
    weekly: {
      proposalsShared: 32,
      confirmedBookings: 14,
      conversionRate: '43.7%',
      recentActivity: [
        { id: 1, time: 'Monday', action: '12 Proposals Shared', tour: 'Multiple', dest: '-' },
        { id: 2, time: 'Tuesday', action: '5 Bookings Confirmed', tour: 'Multiple', dest: '-' },
        { id: 3, time: 'Wednesday', action: '8 Proposals Shared', tour: 'Multiple', dest: '-' },
        { id: 4, time: 'Thursday', action: '6 Bookings Confirmed', tour: 'Multiple', dest: '-' },
      ]
    }
  });

  const data = performanceData[viewMode];

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: logForm.action,
      tour: logForm.tour,
      dest: logForm.dest
    };
    
    setPerformanceData(prev => {
      const updated = { ...prev };
      // Prepend to daily activity
      updated.daily.recentActivity = [newLog, ...updated.daily.recentActivity];
      // Increment counter
      if (logForm.action === 'Proposal Shared') {
        updated.daily.proposalsShared += 1;
      } else {
        updated.daily.confirmedBookings += 1;
      }
      // Re-calculate conversion
      updated.daily.conversionRate = Math.round((updated.daily.confirmedBookings / (updated.daily.proposalsShared || 1)) * 100) + '%';
      return updated;
    });
    
    setIsLoggingMode(false);
    setLogForm({ action: 'Proposal Shared', tour: '', dest: '' });
  };

  return (
    <ToursLayout 
      title={<span className="text-gradient">Ops → Sales Performance</span>} 
      subtitle="Track the daily and weekly handoff from Operations to Sales, including proposals shared and bookings confirmed."
    >
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsLoggingMode(true)}
        >
          <Plus size={18} /> Log Performance Data
        </button>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <button 
            onClick={() => setViewMode('daily')}
            className={\`btn \${viewMode === 'daily' ? 'btn-primary' : 'btn-outline'}\`}
            style={{ border: 'none', padding: '0.4rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            Daily View
          </button>
          <button 
            onClick={() => setViewMode('weekly')}
            className={\`btn \${viewMode === 'weekly' ? 'btn-primary' : 'btn-outline'}\`}
            style={{ border: 'none', padding: '0.4rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            Weekly View
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Metric 1 */}
        <div className="card card-hover animate-slide-up" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', animationDelay: '0.1s' }}>
          <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.2) 0%, rgba(0, 230, 230, 0.05) 100%)', color: '#00E6E6', borderRadius: '16px', border: '1px solid rgba(0, 230, 230, 0.2)' }}>
            <FileText size={32} className="glow-icon" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Proposals Shared</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.2rem 0', color: '#fff', letterSpacing: '-0.02em' }}>{data.proposalsShared}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> +2 from {viewMode === 'daily' ? 'yesterday' : 'last week'}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card card-hover animate-slide-up" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', animationDelay: '0.2s' }}>
          <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.2) 0%, rgba(0, 230, 118, 0.05) 100%)', color: '#00E676', borderRadius: '16px', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
            <CheckCircle size={32} className="glow-icon" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confirmed Bookings</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.2rem 0', color: '#fff', letterSpacing: '-0.02em' }}>{data.confirmedBookings}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> +1 from {viewMode === 'daily' ? 'yesterday' : 'last week'}
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card card-hover animate-slide-up" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', animationDelay: '0.3s' }}>
          <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(179, 136, 255, 0.2) 0%, rgba(179, 136, 255, 0.05) 100%)', color: '#B388FF', borderRadius: '16px', border: '1px solid rgba(179, 136, 255, 0.2)' }}>
            <Zap size={32} className="glow-icon" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Conversion Rate</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.2rem 0', color: '#fff', letterSpacing: '-0.02em' }}>{data.conversionRate}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on shared vs confirmed</div>
          </div>
        </div>

      </div>

      <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', animationDelay: '0.4s' }}>
        <div style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} style={{ color: 'var(--primary-color)' }} /> Recent Activity Log
          </h3>
        </div>
        <div className="table-container" style={{ border: 'none', borderRadius: '0', background: 'transparent' }}>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: 'transparent' }}>
                <th style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.2)' }}>Time / Day</th>
                <th style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.2)' }}>Action</th>
                <th style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.2)' }}>Tour Title</th>
                <th style={{ padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.2)' }}>Destination</th>
              </tr>
            </thead>
            <tbody>
              {data.recentActivity.map(act => (
                <tr key={act.id} style={{ transition: 'background 0.2s', cursor: 'default' }}>
                  <td style={{ color: 'var(--text-tertiary)', padding: '1.25rem 2rem', fontWeight: 500 }}>{act.time}</td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <span className={\`pill \${act.action.includes('Booking') ? 'pill-success' : 'pill-primary'}\`}>
                      {act.action}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, padding: '1.25rem 2rem', color: '#fff', fontSize: '1.05rem' }}>{act.tour}</td>
                  <td style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)' }}>{act.dest}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.recentActivity.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No activity logged yet.</div>
          )}
        </div>
      </div>

      {/* Logging Modal */}
      {isLoggingMode && (
        <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setIsLoggingMode(false); }}>
          <div className="modal-content card animate-slide-up" style={{ maxWidth: '550px', background: 'var(--surface-color)', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={20} style={{ color: 'var(--primary-color)' }} /> Log Performance Data
              </h2>
              <button onClick={() => setIsLoggingMode(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleLogSubmit} style={{ padding: '2rem' }}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Action Type</label>
                <select 
                  className="form-control" 
                  value={logForm.action} 
                  onChange={e => setLogForm({...logForm, action: e.target.value})} 
                  required
                >
                  <option value="Proposal Shared">Proposal Shared</option>
                  <option value="Booking Confirmed">Booking Confirmed</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Tour Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g., Kashmir Family Tour"
                  value={logForm.tour} 
                  onChange={e => setLogForm({...logForm, tour: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Destination</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g., Kashmir"
                  value={logForm.dest} 
                  onChange={e => setLogForm({...logForm, dest: e.target.value})} 
                  required 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsLoggingMode(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default OpsSalesPerformance;
`;

fs.writeFileSync('src/pages/tours/OpsSalesPerformance.jsx', content);
