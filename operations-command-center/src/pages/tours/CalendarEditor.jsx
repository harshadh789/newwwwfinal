import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Trash2, Edit } from 'lucide-react';
import { dataService } from '../../services/MockDataService';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CalendarEditor = ({ destinations, onClose, onRefresh }) => {
  const [localDestinations, setLocalDestinations] = useState(JSON.parse(JSON.stringify(destinations)));
  const [hasChanges, setHasChanges] = useState(false);
  const [editingDetailsDest, setEditingDetailsDest] = useState(null);

  useEffect(() => {
    if (!hasChanges) {
      setLocalDestinations(JSON.parse(JSON.stringify(destinations)));
    }
  }, [destinations, hasChanges]);

  const handleMonthChange = (destId, month, value) => {
    setLocalDestinations(prev => prev.map(d => 
      d.id === destId 
        ? { ...d, monthly: { ...d.monthly, [month.toLowerCase()]: value } } 
        : d
    ));
    setHasChanges(true);
  };

  const handleNameChange = (destId, value) => {
    setLocalDestinations(prev => prev.map(d => 
      d.id === destId 
        ? { ...d, destinationName: value } 
        : d
    ));
    setHasChanges(true);
  };

  const handleTypeChange = (destId, value) => {
    setLocalDestinations(prev => prev.map(d => 
      d.id === destId 
        ? { ...d, type: value } 
        : d
    ));
    setHasChanges(true);
  };

  const handleAddNew = () => {
    const newDest = {
      id: `new-${Date.now()}`,
      destinationId: `new-dest-${Date.now()}`,
      destinationName: 'New Destination',
      type: 'DOMESTIC',
      bestTravelWindow: '',
      notes: '',
      status: 'ACTIVE',
      monthly: { jan: 'Off', feb: 'Off', mar: 'Off', apr: 'Off', may: 'Off', jun: 'Off', jul: 'Off', aug: 'Off', sep: 'Off', oct: 'Off', nov: 'Off', dec: 'Off' }
    };
    setLocalDestinations([newDest, ...localDestinations]);
    setHasChanges(true);
  };

  const handleDelete = async (destId) => {
    if (destId.startsWith('new-')) {
      setLocalDestinations(prev => prev.filter(d => d.id !== destId));
    } else {
      // Actually delete from backend
      const dest = localDestinations.find(d => d.id === destId);
      await dataService.saveSeasonality({ ...dest, status: 'ARCHIVED' });
      setLocalDestinations(prev => prev.filter(d => d.id !== destId));
      onRefresh(); // Ensure parent view updates immediately
    }
  };

  const handleSaveAll = async () => {
    for (const dest of localDestinations) {
      await dataService.saveSeasonality(dest);
    }
    setHasChanges(false);
    onRefresh();
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    setLocalDestinations(prev => prev.map(d => 
      d.id === editingDetailsDest.id ? editingDetailsDest : d
    ));
    setHasChanges(true);
    setEditingDetailsDest(null);
  };

  const getSelectColor = (val) => {
    if (val === 'Peak') return 'var(--success-color)';
    if (val === 'Good') return 'var(--warning-color)';
    return 'var(--text-tertiary)';
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--bg-color)', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Calendar Data Manager</h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Rapidly configure seasonality and destination data</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={handleAddNew}>
            <Plus size={16} style={{ marginRight: '4px' }}/> Add Destination
          </button>
          <button 
            className={`btn ${hasChanges ? 'btn-primary' : 'btn-outline'}`} 
            onClick={handleSaveAll}
            disabled={!hasChanges}
            style={{ fontWeight: hasChanges ? 'bold' : 'normal' }}
          >
            <Save size={16} style={{ marginRight: '4px' }}/> Save Changes
          </button>
          <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: '1rem' }}>
            <X size={16} style={{ marginRight: '4px' }}/> Close
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface-color)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--surface-color)', zIndex: 10 }}>Destination</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--surface-color)', zIndex: 10 }}>Type</th>
              {months.map(m => (
                <th key={m} style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--surface-color)', zIndex: 10, textAlign: 'center' }}>{m}</th>
              ))}
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--surface-color)', zIndex: 10, textAlign: 'center' }}>Details</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--surface-color)', zIndex: 10, textAlign: 'center' }}>Del</th>
            </tr>
          </thead>
          <tbody>
            {localDestinations.map((dest, idx) => (
              <tr key={dest.id} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '0.5rem' }}>
                  <input 
                    type="text" 
                    value={dest.destinationName} 
                    onChange={(e) => handleNameChange(dest.id, e.target.value)}
                    style={{ background: 'transparent', border: '1px solid transparent', color: 'var(--text-primary)', width: '100%', padding: '0.25rem', fontSize: '0.9rem', fontWeight: 600 }}
                    onFocus={e => e.target.style.border = '1px solid var(--primary-color)'}
                    onBlur={e => e.target.style.border = '1px solid transparent'}
                  />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <select 
                    value={dest.type}
                    onChange={(e) => handleTypeChange(dest.id, e.target.value)}
                    style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.25rem', borderRadius: '4px', fontSize: '0.8rem' }}
                  >
                    <option value="DOMESTIC">DOM</option>
                    <option value="INTERNATIONAL">INT</option>
                  </select>
                </td>
                {months.map(m => (
                  <td key={m} style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <select 
                      value={dest.monthly[m.toLowerCase()]}
                      onChange={(e) => handleMonthChange(dest.id, m, e.target.value)}
                      style={{ 
                        background: 'var(--surface-color)', 
                        border: '1px solid var(--border-color)', 
                        color: getSelectColor(dest.monthly[m.toLowerCase()]), 
                        padding: '0.25rem', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        fontWeight: dest.monthly[m.toLowerCase()] === 'Peak' ? 'bold' : 'normal',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Peak" style={{ color: 'var(--success-color)' }}>Peak</option>
                      <option value="Good" style={{ color: 'var(--warning-color)' }}>Good</option>
                      <option value="Off" style={{ color: 'var(--text-tertiary)' }}>Off</option>
                    </select>
                  </td>
                ))}
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <button className="btn btn-outline" style={{ padding: '4px' }} onClick={() => setEditingDetailsDest(dest)} title="Edit Notes & Best Season">
                    <Edit size={14} />
                  </button>
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <button className="btn btn-outline" style={{ padding: '4px', color: 'var(--danger-color)', borderColor: 'transparent' }} onClick={() => handleDelete(dest.id)} title="Archive Destination">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS EDIT MODAL */}
      {editingDetailsDest && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ background: 'var(--surface-color)', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Details: {editingDetailsDest.destinationName}</h3>
              <button className="btn btn-outline" style={{ padding: '4px' }} onClick={() => setEditingDetailsDest(null)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSaveDetails} style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Best Travel Window (Summary)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editingDetailsDest.bestTravelWindow}
                  onChange={e => setEditingDetailsDest({...editingDetailsDest, bestTravelWindow: e.target.value})}
                  placeholder="e.g. June - September"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Why / Notes</label>
                <textarea 
                  className="form-control" 
                  rows={4}
                  value={editingDetailsDest.notes}
                  onChange={e => setEditingDetailsDest({...editingDetailsDest, notes: e.target.value})}
                  placeholder="Explain why this destination is suitable during its peak seasons..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setEditingDetailsDest(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Done</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarEditor;
