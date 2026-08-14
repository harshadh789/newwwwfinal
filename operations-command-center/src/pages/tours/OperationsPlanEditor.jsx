import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Trash2 } from 'lucide-react';
import { dataService } from '../../services/MockDataService';

const OperationsPlanEditor = ({ plan, tours, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    tourId: '',
    status: 'Proposed',
    departureDate: '',
    returnDate: '',
    expectedCustomers: 0,
    expectedRevenue: 0,
    expectedProduction: 0,
    operationsNotes: ''
  });

  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (plan) {
      setFormData({
        id: plan.id,
        tourId: plan.tourId || '',
        status: plan.status || 'Proposed',
        departureDate: plan.departureDate || '',
        returnDate: plan.returnDate || '',
        expectedCustomers: plan.expectedCustomers || 0,
        expectedRevenue: plan.expectedRevenue || 0,
        expectedProduction: plan.expectedProduction || 0,
        operationsNotes: plan.operationsNotes || ''
      });
    }
  }, [plan]);

  const expectedProfit = Number(formData.expectedRevenue) - Number(formData.expectedProduction);
  const expectedMargin = Number(formData.expectedRevenue) > 0 
    ? ((expectedProfit / Number(formData.expectedRevenue)) * 100).toFixed(1) 
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setError('');
      if (!formData.tourId) {
        setError('Please select a tour.');
        return;
      }
      if (!formData.departureDate || !formData.returnDate) {
        setError('Please provide departure and return dates.');
        return;
      }
      if (new Date(formData.departureDate) > new Date(formData.returnDate)) {
        setError('Return date must be after departure date.');
        return;
      }

      setIsSaving(true);
      
      const payload = {
        ...formData,
        expectedCustomers: Number(formData.expectedCustomers),
        expectedRevenue: Number(formData.expectedRevenue),
        expectedProduction: Number(formData.expectedProduction),
        expectedProfit: expectedProfit,
        expectedMargin: Number(expectedMargin)
      };

      await dataService.saveOperationsPlan(payload);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to save operations plan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this operations plan?')) {
      try {
        setIsSaving(true);
        await dataService.saveOperationsPlan({ ...plan, status: 'ARCHIVED' });
        onRefresh();
        onClose();
      } catch (err) {
        console.error(err);
        setError('Failed to delete operations plan.');
        setIsSaving(false);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px',
      background: 'var(--surface-color)',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column',
      borderLeft: '1px solid var(--border-color)'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
          {plan ? 'Edit Operations Plan' : 'Add Operations Plan'}
        </h2>
        <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tour</label>
          <select 
            name="tourId"
            value={formData.tourId}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
          >
            <option value="">Select a Tour</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
          >
            <option value="Expected">Expected</option>
            <option value="Proposed">Proposed</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Departure Date</label>
            <input 
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Return Date</label>
            <input 
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Expected Customers (Pax)</label>
          <input 
            type="number"
            name="expectedCustomers"
            value={formData.expectedCustomers}
            onChange={handleChange}
            min="0"
            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Expected Revenue (₹)</label>
            <input 
              type="number"
              name="expectedRevenue"
              value={formData.expectedRevenue}
              onChange={handleChange}
              min="0"
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Expected Production (₹)</label>
            <input 
              type="number"
              name="expectedProduction"
              value={formData.expectedProduction}
              onChange={handleChange}
              min="0"
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Calculated Profit:</span>
            <span style={{ fontWeight: 'bold', color: expectedProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
              ₹{expectedProfit.toLocaleString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Calculated Margin:</span>
            <span style={{ fontWeight: 'bold', color: expectedMargin >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
              {expectedMargin}%
            </span>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Operations Notes</label>
          <textarea 
            name="operationsNotes"
            value={formData.operationsNotes}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {plan && (
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.5rem', color: 'var(--danger-color)', borderColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={handleDelete}
            disabled={isSaving}
            title="Delete Plan"
          >
            <Trash2 size={20} />
          </button>
        )}
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose} disabled={isSaving}>Cancel</button>
        <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : <><Save size={16} /> Save Plan</>}
        </button>
      </div>
    </div>
  );
};

export default OperationsPlanEditor;
