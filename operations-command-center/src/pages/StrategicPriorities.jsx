import React, { useEffect, useState } from 'react';
import { dataService } from '../services/MockDataService';
import { useAuth } from '../context/AuthContext';

// ----------------------------------------------------
// UI COMPONENTS
// ----------------------------------------------------

const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status?.toLowerCase()) {
      case 'on plan': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' };
      case 'watch': return { bg: 'rgba(250, 170, 52, 0.1)', color: 'var(--accent-orange)' };
      case 'behind': return { bg: 'rgba(220, 38, 38, 0.1)', color: 'var(--accent-red)' };
      default: return { bg: 'var(--card-border)', color: 'var(--text-secondary)' };
    }
  };
  const { bg, color } = getStyle();
  return <span style={{ background: bg, color: color, padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>{status}</span>;
};

const PriorityCard = ({ priority, index, onClick }) => (
  <div onClick={onClick} className="card" style={{ borderLeft: '4px solid var(--primary-color)', cursor: 'pointer', transition: 'transform 0.2s', marginBottom: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', opacity: 0.5 }}>{String(index + 1).padStart(2, '0')}</div>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{priority.name}</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{priority.strategicStatement}</div>
        </div>
      </div>
      <StatusBadge status={priority.status} />
    </div>

    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '6px' }}>
      <div><span style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.25rem' }}>Horizon</span>{priority.startYear}–{priority.endYear}</div>
      {priority.measures?.map((m, i) => (
        <div key={i}><span style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.25rem' }}>{m.name}</span>{m.unit === '₹' ? '₹' : ''}{m.current?.toLocaleString()}{m.unit === '%' ? '%' : ''}</div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginRight: '0.5rem' }}>Departments:</span>
      {priority.departments?.map(d => (
        <span key={d} style={{ background: 'var(--card-border)', color: 'var(--text-primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{d}</span>
      ))}
    </div>
  </div>
);

const PriorityDetail = ({ priority, tours, onBack, onEdit, isAdmin }) => {
  const supportingTours = tours.filter(t => priority.supportingTourIds?.includes(t.id));
  
  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
        ← Back to Strategic Priorities
      </button>

      <div className="card" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontSize: '1rem', color: 'var(--primary-color)', fontWeight: 700, marginBottom: '0.5rem' }}>{priority.priorityLevel} Priority</div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{priority.name}</h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>{priority.strategicStatement}</p>
          </div>
          {isAdmin && (
            <button onClick={onEdit} style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
              Edit Priority
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Why It Matters</h3>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '3rem' }}>{priority.whyItMatters}</p>

            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Strategic Intent</h3>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '3rem' }}>{priority.strategicIntent}</p>

            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Department Contributions</h3>
            {priority.departments?.map(dept => (
              <div key={dept} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>{dept}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{priority.departmentContributions?.[dept] || "No strategic contribution statement provided."}</p>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Status & Horizons</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <StatusBadge status={priority.status} />
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Source: {priority.statusSource || 'Manual'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {priority.horizons?.map(h => (
                  <span key={h} style={{ background: 'var(--card-bg)', color: 'var(--text-primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid var(--primary-color)' }}>{h.replace('_', ' ')}</span>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Key Measures</h3>
              {priority.measures?.map((m, i) => (
                <div key={i} style={{ marginBottom: '1rem', borderBottom: i !== priority.measures.length -1 ? '1px solid var(--card-border)' : 'none', paddingBottom: '1rem' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>{m.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current: {m.unit==='₹'?'₹':''}{m.current?.toLocaleString()}{m.unit==='%'?'%':''}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>Target: {m.unit==='₹'?'₹':''}{m.target?.toLocaleString()}{m.unit==='%'?'%':''}</span>
                  </div>
                  {m.target && m.current && (
                    <div style={{ width: '100%', height: '4px', background: 'var(--card-border)', borderRadius: '2px', marginTop: '0.5rem' }}>
                      <div style={{ width: `${Math.min(100, (m.current / m.target) * 100)}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Supporting Tours</h3>
              {supportingTours.length === 0 ? <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>No tours connected.</p> : null}
              {supportingTours.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{t.name}</span>
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.travelMonth}</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Last updated: {new Date(priority.updatedAt).toLocaleDateString()} by {priority.updatedBy}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriorityForm = ({ initialData, allTours, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '', strategicStatement: '', whyItMatters: '', strategicIntent: '',
    priorityLevel: 'High', status: 'On Plan', startYear: new Date().getFullYear(), endYear: new Date().getFullYear() + 1,
    horizons: [], departments: [], departmentContributions: {}, supportingTourIds: [], measures: []
  });

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!formData.name) return alert('Priority name is required');
    onSave(formData);
  };

  const DEPARTMENTS = ['Marketing', 'Sales', 'Operations', 'Finance'];
  const HORIZONS = ['10_YEAR', '5_YEAR', '3_YEAR', '1_YEAR', '3_MONTH', '1_MONTH'];
  const STATUSES = ['On Plan', 'Watch', 'Behind', 'Not Started', 'Completed', 'Archived'];

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{initialData ? 'Edit Strategic Priority' : 'Create Strategic Priority'}</h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Priority Name</label>
          <input type="text" value={formData.name} onChange={e => update('name', e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Strategic Statement</label>
          <input type="text" value={formData.strategicStatement} onChange={e => update('strategicStatement', e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Why It Matters</label>
          <textarea value={formData.whyItMatters} onChange={e => update('whyItMatters', e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</label>
            <select value={formData.status} onChange={e => update('status', e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)' }}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Priority Level</label>
            <select value={formData.priorityLevel} onChange={e => update('priorityLevel', e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)' }}>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Departments</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {DEPARTMENTS.map(d => (
              <label key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <input type="checkbox" checked={formData.departments?.includes(d)} onChange={e => {
                  const newDepts = e.target.checked ? [...(formData.departments||[]), d] : (formData.departments||[]).filter(x => x !== d);
                  update('departments', newDepts);
                }} /> {d}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Supporting Tours</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', maxHeight: '150px', overflowY: 'auto', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            {allTours.map(t => (
              <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', width: '200px' }}>
                <input type="checkbox" checked={formData.supportingTourIds?.includes(t.id)} onChange={e => {
                  const newIds = e.target.checked ? [...(formData.supportingTourIds||[]), t.id] : (formData.supportingTourIds||[]).filter(x => x !== t.id);
                  update('supportingTourIds', newIds);
                }} /> {t.name}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Save Priority</button>
          <button onClick={onCancel} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------

const StrategicPriorities = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [priorities, setPriorities] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [view, setView] = useState('list'); // 'list', 'detail', 'edit', 'new'
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const p = await dataService.getStrategicPriorities();
    const t = await dataService.getTours();
    
    // Sort by sortOrder or creation
    p.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    
    setPriorities(p);
    setTours(t);
    setLoading(false);
  };

  const handleSave = async (priorityData) => {
    try {
      await dataService.saveStrategicPriority(priorityData);
      await fetchData();
      setView(selectedId ? 'detail' : 'list');
    } catch (err) {
      alert('Error saving priority: ' + err.message);
    }
  };

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading Strategic Priorities...</div>;

  const activePriorities = priorities.filter(p => p.status !== 'Archived');
  const selectedPriority = priorities.find(p => p.id === selectedId);

  return (
    <div>
      {view === 'list' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Strategic Priorities</h1>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '1.125rem' }}>The few things that matter most to GoCampFly.</p>
            </div>
            {isAdmin && (
              <button 
                onClick={() => { setSelectedId(null); setView('new'); }}
                style={{ padding: '0.75rem 1.5rem', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                + Create Priority
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div><span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activePriorities.length}</span><div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Active</div></div>
            <div><span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-green)' }}>{activePriorities.filter(p => p.status === 'On Plan').length}</span><div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>On Plan</div></div>
            <div><span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-orange)' }}>{activePriorities.filter(p => p.status === 'Watch').length}</span><div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Watch</div></div>
          </div>

          {activePriorities.length > 7 && (
            <div style={{ padding: '1rem', background: 'rgba(250, 170, 52, 0.1)', color: 'var(--accent-orange)', borderRadius: '6px', marginBottom: '2rem', border: '1px solid var(--accent-orange)' }}>
              You currently have {activePriorities.length} active strategic priorities. Strategic priorities are most effective when kept focused (3-7 recommended).
            </div>
          )}

          {activePriorities.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '8px', border: '1px dashed var(--card-border)' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{isAdmin ? 'No Strategic Priorities have been configured.' : 'Strategic Priorities have not yet been configured.'}</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activePriorities.map((p, idx) => (
                <PriorityCard key={p.id} priority={p} index={idx} onClick={() => { setSelectedId(p.id); setView('detail'); }} />
              ))}
            </div>
          )}
        </>
      )}

      {view === 'detail' && selectedPriority && (
        <PriorityDetail 
          priority={selectedPriority} 
          tours={tours}
          isAdmin={isAdmin}
          onBack={() => { setSelectedId(null); setView('list'); }}
          onEdit={() => setView('edit')}
        />
      )}

      {(view === 'edit' || view === 'new') && (
        <PriorityForm 
          initialData={view === 'edit' ? selectedPriority : null}
          allTours={tours}
          onSave={handleSave}
          onCancel={() => setView(selectedPriority ? 'detail' : 'list')}
        />
      )}
    </div>
  );
};

export default StrategicPriorities;
