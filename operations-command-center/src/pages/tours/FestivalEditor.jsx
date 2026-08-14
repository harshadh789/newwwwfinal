import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

const EVENT_TYPES = [
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'PUBLIC_HOLIDAY', label: 'Public Holiday' },
  { value: 'SCHOOL_HOLIDAY', label: 'School Holiday' },
  { value: 'LONG_WEEKEND', label: 'Long Weekend' },
  { value: 'TRAVEL_WINDOW', label: 'Travel Window' },
];

const GEO_SCOPES = [
  { value: 'NATIONAL', label: 'National' },
  { value: 'STATE', label: 'State' },
  { value: 'REGIONAL', label: 'Regional' },
  { value: 'CITY', label: 'City' },
  { value: 'INTERNATIONAL', label: 'International' },
];

const IMPACT_LEVELS = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
];

const FAMILY_RELEVANCE = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
];

const empty = () => ({
  name: '',
  type: 'FESTIVAL',
  startDate: '',
  endDate: '',
  geographicScope: 'NATIONAL',
  country: 'India',
  state: '',
  region: '',
  city: '',
  travelImpact: 'MEDIUM',
  description: '',
  whyItMatters: '',
  destinationIds: [],
  tourIds: [],
  planningNotes: '',
  status: 'ACTIVE',
  recurring: false,
  schoolHoliday: null,
});

const FestivalEditor = ({ event, existingEvents, destinations, tours, onSave, onCancel }) => {
  const isNew = !event?.id;
  const [form, setForm] = useState(() => event ? { ...empty(), ...event } : empty());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [duplicate, setDuplicate] = useState(null);
  const [schoolData, setSchoolData] = useState(
    event?.schoolHoliday || { state: '', region: '', schoolSystem: '', academicYear: '', familyTravelRelevance: 'MEDIUM' }
  );

  // Duplicate detection
  useEffect(() => {
    if (!form.name || form.name.length < 3) { setDuplicate(null); return; }
    const lower = form.name.toLowerCase().trim();
    const found = existingEvents.find(e =>
      e.id !== form.id &&
      e.status !== 'ARCHIVED' &&
      e.name.toLowerCase().trim() === lower &&
      e.startDate === form.startDate
    );
    setDuplicate(found || null);
  }, [form.name, form.startDate]);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const toggleDest = (id) => {
    setForm(prev => ({
      ...prev,
      destinationIds: prev.destinationIds.includes(id)
        ? prev.destinationIds.filter(d => d !== id)
        : [...prev.destinationIds, id],
    }));
  };

  const toggleTour = (id) => {
    setForm(prev => ({
      ...prev,
      tourIds: prev.tourIds.includes(id)
        ? prev.tourIds.filter(t => t !== id)
        : [...prev.tourIds, id],
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Event name is required.';
    if (!form.startDate) return 'Start date is required.';
    if (!form.endDate) return 'End date is required.';
    if (new Date(form.endDate) < new Date(form.startDate)) return 'End date must be on or after start date.';
    if (!form.geographicScope) return 'Geographic scope is required.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        schoolHoliday: form.type === 'SCHOOL_HOLIDAY' ? schoolData : null,
      };
      await onSave(payload);
    } catch (ex) {
      setError(ex.message || 'Failed to save event.');
      setSaving(false);
    }
  };

  const showStateField = ['STATE', 'REGIONAL', 'CITY'].includes(form.geographicScope);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
    }}>
      <div style={{
        width: '520px', height: '100vh', background: 'var(--sidebar-bg)',
        borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header — sticky, never scrolls away */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{isNew ? '+ Add Travel Event' : 'Edit Travel Event'}</h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {isNew ? 'Create a new festival, holiday, or travel window.' : `Editing: ${event.name}`}
            </p>
          </div>
          <button aria-label="Close Editor" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* Duplicate warning */}
        {duplicate && (
          <div style={{ margin: '1rem 1.5rem 0', padding: '0.75rem 1rem', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#F59E0B' }}>Possible Duplicate</strong>
                <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  An event named <strong>{duplicate.name}</strong> ({duplicate.startDate}) already exists.
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label htmlFor="fe-name" style={labelStyle}>Event Name *</label>
            <input id="fe-name" className="form-control" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Diwali" />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="fe-type" style={labelStyle}>Event Type *</label>
            <select id="fe-type" className="form-control" value={form.type} onChange={e => set('type', e.target.value)}>
              {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="fe-startdate" style={labelStyle}>Start Date *</label>
              <input id="fe-startdate" className="form-control" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
            </div>
            <div>
              <label htmlFor="fe-enddate" style={labelStyle}>End Date *</label>
              <input id="fe-enddate" className="form-control" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
            </div>
          </div>

          {/* Geographic Scope */}
          <div>
            <label htmlFor="fe-scope" style={labelStyle}>Geographic Scope *</label>
            <select id="fe-scope" className="form-control" value={form.geographicScope} onChange={e => set('geographicScope', e.target.value)}>
              {GEO_SCOPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {showStateField && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="fe-state" style={labelStyle}>State</label>
                <input id="fe-state" className="form-control" value={form.state} onChange={e => set('state', e.target.value)} placeholder="e.g. Kerala" />
              </div>
              <div>
                <label htmlFor="fe-region" style={labelStyle}>Region / City</label>
                <input id="fe-region" className="form-control" value={form.region || form.city} onChange={e => {
                  if (form.geographicScope === 'CITY') set('city', e.target.value);
                  else set('region', e.target.value);
                }} placeholder="e.g. Southern India" />
              </div>
            </div>
          )}

          {/* Travel Impact */}
          <div>
            <label style={labelStyle}>Travel Impact *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {IMPACT_LEVELS.map(l => (
                <button
                  key={l.value} type="button"
                  onClick={() => set('travelImpact', l.value)}
                  style={{
                    flex: 1, padding: '0.5rem', border: '1px solid',
                    borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    transition: 'all 0.15s',
                    borderColor: form.travelImpact === l.value ? impactColor(l.value) : 'var(--border-color)',
                    background: form.travelImpact === l.value ? `${impactColor(l.value)}22` : 'transparent',
                    color: form.travelImpact === l.value ? impactColor(l.value) : 'var(--text-secondary)',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* School Holiday fields */}
          {form.type === 'SCHOOL_HOLIDAY' && (
            <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.08)', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>School Holiday Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="fe-school-state" style={labelStyle}>State / Region</label>
                  <input id="fe-school-state" className="form-control" value={schoolData.state} onChange={e => setSchoolData(p => ({ ...p, state: e.target.value }))} placeholder="e.g. Delhi" />
                </div>
                <div>
                  <label htmlFor="fe-school-system" style={labelStyle}>School System</label>
                  <input id="fe-school-system" className="form-control" value={schoolData.schoolSystem} onChange={e => setSchoolData(p => ({ ...p, schoolSystem: e.target.value }))} placeholder="e.g. Regional School Holiday" />
                </div>
              </div>
              <div>
                <label htmlFor="fe-school-relevance" style={labelStyle}>Family Travel Relevance</label>
                <select id="fe-school-relevance" className="form-control" value={schoolData.familyTravelRelevance} onChange={e => setSchoolData(p => ({ ...p, familyTravelRelevance: e.target.value }))}>
                  {FAMILY_RELEVANCE.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="fe-description" style={labelStyle}>Description</label>
            <textarea id="fe-description" className="form-control" rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description of the event..." style={{ resize: 'vertical' }} />
          </div>

          {/* Why It Matters */}
          <div>
            <label htmlFor="fe-why" style={labelStyle}>Why It Matters for GoCampFly</label>
            <textarea id="fe-why" className="form-control" rows={2} value={form.whyItMatters} onChange={e => set('whyItMatters', e.target.value)} placeholder="Explain travel demand relevance..." style={{ resize: 'vertical' }} />
          </div>

          {/* Relevant Destinations */}
          <div>
            <label style={labelStyle}>Relevant Destinations</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {destinations.map(d => {
                const destId = d.destinationId || d.id;
                const checked = form.destinationIds.includes(destId);
                return (
                  <button
                    key={destId} type="button"
                    onClick={() => toggleDest(destId)}
                    style={{
                      padding: '0.35rem 0.75rem', borderRadius: '20px', cursor: 'pointer',
                      fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
                      border: `1px solid ${checked ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      background: checked ? 'var(--primary-color)' : 'transparent',
                      color: checked ? '#000' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                    }}
                  >
                    {checked && <CheckCircle size={12} />}
                    {d.destinationName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Relevant Tours */}
          <div>
            <label style={labelStyle}>Relevant GoCampFly Tours</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {tours.map(t => {
                const checked = form.tourIds.includes(t.id);
                return (
                  <button
                    key={t.id} type="button"
                    onClick={() => toggleTour(t.id)}
                    style={{
                      padding: '0.35rem 0.75rem', borderRadius: '20px', cursor: 'pointer',
                      fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.15s',
                      border: `1px solid ${checked ? '#14B8A6' : 'var(--border-color)'}`,
                      background: checked ? 'rgba(20,184,166,0.15)' : 'transparent',
                      color: checked ? '#14B8A6' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                    }}
                  >
                    {checked && <CheckCircle size={12} />}
                    {t.name}
                  </button>
                );
              })}
              {tours.length === 0 && <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>No tours in portfolio yet.</span>}
            </div>
          </div>

          {/* Planning Notes */}
          <div>
            <label htmlFor="fe-notes" style={labelStyle}>Planning Notes</label>
            <textarea id="fe-notes" className="form-control" rows={2} value={form.planningNotes} onChange={e => set('planningNotes', e.target.value)} placeholder="Internal planning notes..." style={{ resize: 'vertical' }} />
          </div>

          {/* Recurring */}
          <label htmlFor="fe-recurring" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <input id="fe-recurring" type="checkbox" checked={form.recurring} onChange={e => set('recurring', e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            Recurring annually (each year's dates remain independently editable)
          </label>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#EF4444', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Footer actions */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 2 }}>
              {saving ? 'Saving…' : isNew ? 'Create Event' : 'Save Changes'}
            </button>
          </div>
        </form>
        </div>{/* end scrollable body */}
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: 'var(--text-secondary)', textTransform: 'uppercase',
  letterSpacing: '0.05em', marginBottom: '0.4rem',
};

const impactColor = (level) => {
  if (level === 'HIGH') return '#EF4444';
  if (level === 'MEDIUM') return '#F59E0B';
  return '#6B7280';
};

export default FestivalEditor;
