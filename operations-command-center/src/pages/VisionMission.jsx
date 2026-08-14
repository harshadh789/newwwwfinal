import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/MockDataService';

const VisionMission = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editVision, setEditVision] = useState('');
  const [editMission, setEditMission] = useState('');
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const companyData = await dataService.getCompanyStrategy();
      setData(companyData);
    } catch (err) {
      setError('Unable to load Vision & Mission.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditVision(data.vision || '');
    setEditMission(data.mission || '');
    setIsEditing(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    if (editVision !== data.vision || editMission !== data.mission) {
      if (window.confirm("Discard unsaved changes?")) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    if (!editVision.trim() || !editMission.trim()) {
      setSaveError('Vision and Mission cannot be blank.');
      return;
    }
    
    try {
      setSaveError(null);
      const updated = await dataService.updateVisionMission(editVision, editMission);
      setData(updated);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message || 'Unable to save changes. Please try again.');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Not available';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading Vision & Mission...</div>;
  if (error) return (
    <div style={{ padding: '2rem' }}>
      <p style={{ color: 'var(--accent-red)', marginBottom: '1rem' }}>{error}</p>
      <button onClick={fetchData} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Retry</button>
    </div>
  );

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Vision & Mission</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>The shared north star for GoCampFly</p>
        </div>
        {isAdmin && !isEditing && (
          <button 
            onClick={handleEdit}
            style={{ 
              padding: '0.5rem 1.5rem', 
              background: 'var(--card-bg)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--card-border)', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Edit Vision & Mission
          </button>
        )}
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--accent-green)' }}>
          Vision & Mission updated successfully.
        </div>
      )}

      {isEditing ? (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Edit Vision & Mission</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Vision</label>
            <textarea 
              value={editVision}
              onChange={(e) => setEditVision(e.target.value)}
              style={{ 
                width: '100%', 
                minHeight: '120px', 
                padding: '1rem', 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '1rem',
                lineHeight: 1.5,
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Mission</label>
            <textarea 
              value={editMission}
              onChange={(e) => setEditMission(e.target.value)}
              style={{ 
                width: '100%', 
                minHeight: '120px', 
                padding: '1rem', 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '1rem',
                lineHeight: 1.5,
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {saveError && (
            <div style={{ color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '0.875rem' }}>{saveError}</div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleCancel}
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '2rem', padding: '2.5rem' }}>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Our Vision</h3>
            {data.vision ? (
              <p style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 300, lineHeight: 1.6 }}>
                {data.vision}
              </p>
            ) : (
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: '1rem' }}>
                  Vision has not been added yet.
                </p>
                {isAdmin && <button onClick={handleEdit} style={{ padding: '0.5rem 1rem', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', borderRadius: '4px', cursor: 'pointer' }}>Add Vision</button>}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Our Mission</h3>
            {data.mission ? (
              <p style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 300, lineHeight: 1.6 }}>
                {data.mission}
              </p>
            ) : (
              <div>
                <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: '1rem' }}>
                  Mission has not been added yet.
                </p>
                {isAdmin && <button onClick={handleEdit} style={{ padding: '0.5rem 1rem', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', borderRadius: '4px', cursor: 'pointer' }}>Add Mission</button>}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Last updated:</span> {data.updatedAt ? formatDate(data.updatedAt) : 'Never'}
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Updated by:</span> {data.updatedBy || 'N/A'}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default VisionMission;
