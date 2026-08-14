import React from 'react';
import {
  X, Calendar, MapPin, Zap, Globe, Flag, Edit2, Archive, Trash2,
  Navigation, Repeat, School, BookOpen, AlertTriangle
} from 'lucide-react';

const TYPE_LABELS = {
  FESTIVAL: 'Festival',
  PUBLIC_HOLIDAY: 'Public Holiday',
  SCHOOL_HOLIDAY: 'School Holiday',
  LONG_WEEKEND: 'Long Weekend',
  TRAVEL_WINDOW: 'Travel Window',
};

const SCOPE_LABELS = {
  NATIONAL: 'National',
  STATE: 'State',
  REGIONAL: 'Regional',
  CITY: 'City',
  INTERNATIONAL: 'International',
};

const TYPE_COLORS = {
  FESTIVAL: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B', border: 'rgba(245,158,11,0.3)' },
  PUBLIC_HOLIDAY: { bg: 'rgba(59,130,246,0.12)', text: '#60A5FA', border: 'rgba(59,130,246,0.3)' },
  SCHOOL_HOLIDAY: { bg: 'rgba(16,185,129,0.12)', text: '#34D399', border: 'rgba(16,185,129,0.3)' },
  LONG_WEEKEND: { bg: 'rgba(139,92,246,0.12)', text: '#A78BFA', border: 'rgba(139,92,246,0.3)' },
  TRAVEL_WINDOW: { bg: 'rgba(20,184,166,0.12)', text: '#2DD4BF', border: 'rgba(20,184,166,0.3)' },
};

const IMPACT_COLORS = {
  HIGH: { text: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
  MEDIUM: { text: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  LOW: { text: '#6B7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)' },
};

const fmtDate = (d) => {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const durDays = (start, end) => {
  if (!start || !end) return null;
  const diff = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
  return diff === 1 ? '1 day' : `${diff} days`;
};

const Chip = ({ children, color }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600,
    background: color?.bg || 'var(--surface-color)',
    color: color?.text || 'var(--text-secondary)',
    border: `1px solid ${color?.border || 'var(--border-color)'}`,
  }}>
    {children}
  </span>
);

const Section = ({ label, children }) => (
  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '0.6rem' }}>
      {label}
    </div>
    {children}
  </div>
);

const FestivalDetail = ({ event, destinations, tours, isAdmin, onEdit, onArchive, onDelete, onClose }) => {
  if (!event) return null;

  const tc = TYPE_COLORS[event.type] || TYPE_COLORS.FESTIVAL;
  const ic = IMPACT_COLORS[event.travelImpact] || IMPACT_COLORS.MEDIUM;

  // Resolve linked destinations
  const linkedDests = (event.destinationIds || [])
    .map(id => destinations.find(d => (d.destinationId || d.id) === id))
    .filter(Boolean);

  // Resolve linked tours
  const linkedTours = (event.tourIds || [])
    .map(id => tours.find(t => t.id === id))
    .filter(Boolean);

  const geoLabel = () => {
    const scope = SCOPE_LABELS[event.geographicScope] || event.geographicScope;
    const parts = [event.state, event.region, event.city].filter(Boolean);
    if (parts.length) return `${scope} — ${parts.join(', ')}`;
    return scope;
  };

  const handleArchive = async () => {
    if (!window.confirm(`Archive "${event.name}"? It will be removed from the active calendar but preserved for historical reference.`)) return;
    await onArchive(event.id);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Permanently delete "${event.name}" (${fmtDate(event.startDate)})?\n\nThis cannot be undone. All destination and tour relationships will be removed.`)) return;
    await onDelete(event.id);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width: '480px', height: '100vh', background: 'var(--sidebar-bg)', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Chip color={tc}>{TYPE_LABELS[event.type] || event.type}</Chip>
              <Chip color={ic}>
                <Zap size={11} fill={ic.text} />
                {event.travelImpact} Impact
              </Chip>
              {event.recurring && <Chip><Repeat size={11} /> Recurring</Chip>}
            </div>
            <button aria-label="Close Detail" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.25rem', flexShrink: 0 }}>
              <X size={20} />
            </button>
          </div>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{event.name}</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} />
              {event.startDate === event.endDate ? fmtDate(event.startDate) : `${fmtDate(event.startDate)} – ${fmtDate(event.endDate)}`}
            </span>
            {durDays(event.startDate, event.endDate) && (
              <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{durDays(event.startDate, event.endDate)}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>

          {/* Geographic scope */}
          <Section label="Coverage">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              {event.geographicScope === 'NATIONAL' ? <Globe size={15} /> : <Flag size={15} />}
              <span>{geoLabel()}</span>
            </div>
          </Section>

          {/* Travel Impact */}
          <Section label="Travel Impact">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ic.text }} />
              <span style={{ fontWeight: 700, color: ic.text, fontSize: '1rem' }}>{event.travelImpact}</span>
            </div>
          </Section>

          {/* Travel window visual */}
          {event.startDate !== event.endDate && (
            <Section label="Travel Window">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                {fmtDate(event.startDate)} ── {fmtDate(event.endDate)}
              </div>
              <div style={{ background: `linear-gradient(90deg, ${ic.text}44, ${ic.text}99)`, height: '6px', borderRadius: '3px', marginTop: '0.5rem' }} />
            </Section>
          )}

          {/* Why It Matters */}
          {event.whyItMatters && (
            <Section label="Why It Matters">
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{event.whyItMatters}</p>
            </Section>
          )}

          {/* Description */}
          {event.description && (
            <Section label="About">
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{event.description}</p>
            </Section>
          )}

          {/* School Holiday extras */}
          {event.type === 'SCHOOL_HOLIDAY' && event.schoolHoliday && (
            <Section label="School Holiday Details">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                {event.schoolHoliday.state && (
                  <div><span style={{ color: 'var(--text-tertiary)' }}>State: </span>{event.schoolHoliday.state}</div>
                )}
                {event.schoolHoliday.schoolSystem && (
                  <div><span style={{ color: 'var(--text-tertiary)' }}>School System: </span>{event.schoolHoliday.schoolSystem}</div>
                )}
                {event.schoolHoliday.familyTravelRelevance && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>Family Travel Relevance: </span>
                    <Chip color={IMPACT_COLORS[event.schoolHoliday.familyTravelRelevance]}>
                      <School size={11} /> {event.schoolHoliday.familyTravelRelevance}
                    </Chip>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Relevant Destinations */}
          <Section label="Relevant Destinations">
            {linkedDests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {linkedDests.map(d => (
                  <div key={d.destinationId || d.id} style={{
                    padding: '0.6rem 0.9rem', background: 'var(--surface-color)', borderRadius: '6px',
                    border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={13} style={{ color: 'var(--primary-color)' }} />
                      {d.destinationName}
                    </span>
                    {d.bestTravelWindow && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Best: {d.bestTravelWindow}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No destinations linked yet.</p>
            )}
          </Section>

          {/* Relevant Tours */}
          <Section label="GoCampFly Tours">
            {linkedTours.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {linkedTours.map(t => (
                  <div key={t.id} style={{
                    padding: '0.6rem 0.9rem', background: 'var(--surface-color)', borderRadius: '6px',
                    border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Navigation size={13} style={{ color: '#14B8A6' }} />
                      {t.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {t.destination} · {t.travelDate || t.travelMonth}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No tours linked yet.</p>
            )}
          </Section>

          {/* Planning Notes */}
          {event.planningNotes && (
            <Section label="Planning Notes">
              <div style={{ padding: '0.75rem', background: 'rgba(99,102,241,0.06)', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.15)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {event.planningNotes}
              </div>
            </Section>
          )}

          {/* Metadata */}
          <Section label="Record">
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div>Created: {event.createdBy} · {event.createdAt ? new Date(event.createdAt).toLocaleDateString('en-GB') : '—'}</div>
              <div>Updated: {event.updatedBy} · {event.updatedAt ? new Date(event.updatedAt).toLocaleDateString('en-GB') : '—'}</div>
            </div>
          </Section>

          {/* Admin Actions */}
          {isAdmin && (
            <Section label="Admin Actions">
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-outline"
                  onClick={() => onEdit(event)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
                >
                  <Edit2 size={14} /> Edit Event
                </button>
                <button
                  onClick={handleArchive}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem',
                    padding: '0.45rem 0.9rem', background: 'none', border: '1px solid rgba(245,158,11,0.4)',
                    borderRadius: '6px', cursor: 'pointer', color: '#F59E0B',
                  }}
                >
                  <Archive size={14} /> Archive
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem',
                    padding: '0.45rem 0.9rem', background: 'none', border: '1px solid rgba(239,68,68,0.4)',
                    borderRadius: '6px', cursor: 'pointer', color: '#EF4444',
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default FestivalDetail;
