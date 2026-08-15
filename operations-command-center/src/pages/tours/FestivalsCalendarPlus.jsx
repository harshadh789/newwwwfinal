import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import {
  Calendar, Plus, ChevronLeft, ChevronRight, Search, Filter, CheckCircle2, Clock, Zap, Globe,
  MapPin, School, List, Grid3x3, X, TrendingUp, Sparkles, ArrowRight,
  ShieldCheck, AlertTriangle
} from 'lucide-react';

const EVENT_TYPES = [
  { value: '', label: 'All Events' },
  { value: 'FESTIVAL', label: 'Festivals' },
  { value: 'PUBLIC_HOLIDAY', label: 'Public Holidays' },
  { value: 'SCHOOL_HOLIDAY', label: 'School Holidays' },
  { value: 'LONG_WEEKEND', label: 'Long Weekends' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const IMPACT_META = {
  HIGH:   { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   label: 'HIGH' },
  MEDIUM: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  label: 'MEDIUM' },
  LOW:    { color: '#6B7280', bg: 'rgba(107,114,128,0.12)', label: 'LOW' },
};

const fmtDate = (d, short = false) => {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: short ? 'short' : 'long', year: short ? undefined : 'numeric'
  });
};

const durLabel = (start, end) => {
  if (!start || !end) return null;
  const d = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  return d === 1 ? '1 day' : `${d} days`;
};

const TYPE_META = {
  FESTIVAL:       { label: 'Festival',        color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  symbol: '✦' },
  PUBLIC_HOLIDAY: { label: 'Public Holiday',  color: '#60A5FA', bg: 'rgba(59,130,246,0.15)',  symbol: '⚑' },
  SCHOOL_HOLIDAY: { label: 'School Holiday',  color: '#34D399', bg: 'rgba(16,185,129,0.15)',  symbol: '◆' },
  LONG_WEEKEND:   { label: 'Long Weekend',    color: '#A78BFA', bg: 'rgba(139,92,246,0.15)',  symbol: '▲' },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const TypePill = ({ type, small }) => {
  const m = TYPE_META[type] || { label: type, color: '#6B7280', bg: 'rgba(107,114,128,0.1)', symbol: '●' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '3px',
      padding: small ? '0.1rem 0.45rem' : '0.2rem 0.6rem',
      borderRadius: '20px', fontSize: small ? '0.7rem' : '0.75rem', fontWeight: 700,
      background: m.bg, color: m.color,
    }}>
      {m.symbol} {m.label}
    </span>
  );
};

const ImpactBadge = ({ impact }) => {
  const m = IMPACT_META[impact] || IMPACT_META.MEDIUM;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '3px',
      padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em',
      background: m.bg, color: m.color,
    }}>
      <Zap size={10} fill={m.color} /> {m.label}
    </span>
  );
};

// ── Heatmap ────────────────────────────────────────────────────────────────────
const HeatmapRow = ({ year, events, onMonthClick }) => {
  const monthScores = MONTHS.map((_, i) => {
    const monthEvents = events.filter(e => {
      const s = new Date(e.startDate + 'T00:00:00'), end = new Date((e.endDate || e.startDate) + 'T00:00:00');
      return (s.getMonth() === i || end.getMonth() === i) && s.getFullYear() === year;
    });
    const highCount = monthEvents.filter(e => e.travelImpact === 'HIGH').length;
    const midCount  = monthEvents.filter(e => e.travelImpact === 'MEDIUM').length;
    const score = highCount * 3 + midCount * 1.5 + (monthEvents.length - highCount - midCount) * 0.5;
    return { count: monthEvents.length, score, high: highCount > 0 };
  });

  const maxScore = Math.max(...monthScores.map(m => m.score), 1);

  const heatColor = (score) => {
    if (score === 0) return { bg: 'rgba(255,255,255,0.04)', text: 'var(--text-tertiary)', label: '' };
    const pct = score / maxScore;
    if (pct > 0.66) return { bg: 'rgba(239,68,68,0.2)',  text: '#EF4444',  label: 'HIGH' };
    if (pct > 0.33) return { bg: 'rgba(245,158,11,0.2)', text: '#F59E0B',  label: 'MED' };
    return { bg: 'rgba(99,102,241,0.15)', text: '#818CF8', label: 'LOW' };
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.35rem' }}>
      {MONTHS.map((m, i) => {
        const { count, score } = monthScores[i];
        const c = heatColor(score);
        return (
          <button
            key={m}
            onClick={() => onMonthClick(i)}
            title={`${MONTH_FULL[i]} — ${count} event${count !== 1 ? 's' : ''}`}
            style={{
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', cursor: 'pointer',
              background: c.bg, padding: '0.6rem 0.25rem', textAlign: 'center', transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>{m}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: c.text, marginTop: '0.2rem' }}>
              {count > 0 ? c.label || count : '·'}
            </div>
            {count > 0 && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.1rem' }}>{count}ev</div>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ── Event Card ─────────────────────────────────────────────────────────────────
const EventCard = ({ event, destinations, tours, onClick }) => {
  const m = TYPE_META[event.type] || TYPE_META.FESTIVAL;
  const im = IMPACT_META[event.travelImpact] || IMPACT_META.MEDIUM;
  const dur = durLabel(event.startDate, event.endDate);

  const linkedDests = (event.destinationIds || [])
    .map(id => destinations.find(d => (d.destinationId || d.id) === id))
    .filter(Boolean);
  const linkedTours = (event.tourIds || [])
    .map(id => tours.find(t => t.id === id))
    .filter(Boolean);

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--card-bg)', border: `1px solid ${m.color}33`,
        borderRadius: '10px', padding: '1.1rem 1.25rem', cursor: 'pointer',
        transition: 'all 0.2s', display: 'flex', gap: '1rem', alignItems: 'flex-start',
        backdropFilter: 'var(--glass-blur)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '77'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = m.color + '33'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Left: date column */}
      <div style={{
        flexShrink: 0, width: '80px', textAlign: 'center', paddingRight: '1rem',
        borderRight: `2px solid ${m.color}44`,
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>
          {new Date(event.startDate + 'T00:00:00').getDate()}
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {MONTHS[new Date(event.startDate + 'T00:00:00').getMonth()]}
        </div>
        {event.startDate !== event.endDate && (
          <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            to {fmtDate(event.endDate, true)}
          </div>
        )}
        {dur && <div style={{ fontSize: '0.65rem', fontWeight: 700, color: m.color, marginTop: '0.25rem' }}>{dur}</div>}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
          <TypePill type={event.type} small />
          <ImpactBadge impact={event.travelImpact} />
        </div>
        <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {event.name}
        </h3>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <Globe size={12} />
          {event.geographicScope === 'NATIONAL' ? '🇮🇳 National' : [event.state, event.region, event.city].filter(Boolean).join(', ') || event.geographicScope}
        </div>
        {event.description && (
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {event.description}
          </p>
        )}
        {/* Destination & tour pills */}
        {(linkedDests.length > 0 || linkedTours.length > 0) && (
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
            {linkedDests.slice(0, 4).map(d => (
              <span key={d.destinationId || d.id} style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', background: 'rgba(99,102,241,0.12)', color: '#818CF8', borderRadius: '12px', fontWeight: 600 }}>
                <MapPin size={14} style={{ marginRight: '4px' }} /> {d.destinationName}
              </span>
            ))}
            {linkedTours.slice(0, 3).map(t => (
              <span key={t.id} style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', background: 'rgba(20,184,166,0.12)', color: '#2DD4BF', borderRadius: '12px', fontWeight: 600 }}>
                🧭 {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Monthly Summary ─────────────────────────────────────────────────────────────
const MonthSummary = ({ events }) => {
  const counts = {
    FESTIVAL: 0, PUBLIC_HOLIDAY: 0, SCHOOL_HOLIDAY: 0, LONG_WEEKEND: 0, TRAVEL_WINDOW: 0,
    HIGH: 0, MEDIUM: 0, LOW: 0,
  };
  events.forEach(e => {
    if (counts[e.type] !== undefined) counts[e.type]++;
    if (counts[e.travelImpact] !== undefined) counts[e.travelImpact]++;
  });
  const items = [
    { label: 'Festivals', val: counts.FESTIVAL, color: '#F59E0B' },
    { label: 'Public Holidays', val: counts.PUBLIC_HOLIDAY, color: '#60A5FA' },
    { label: 'School Holidays', val: counts.SCHOOL_HOLIDAY, color: '#34D399' },
    { label: 'Long Weekends', val: counts.LONG_WEEKEND, color: '#A78BFA' },
    { label: 'Travel Windows', val: counts.TRAVEL_WINDOW, color: '#2DD4BF' },
  ].filter(i => i.val > 0);
  const impactItems = [
    { label: 'HIGH IMPACT', val: counts.HIGH, color: '#EF4444' },
    { label: 'MEDIUM IMPACT', val: counts.MEDIUM, color: '#F59E0B' },
    { label: 'LOW IMPACT', val: counts.LOW, color: '#6B7280' },
  ].filter(i => i.val > 0);

  if (events.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      {items.map(i => (
        <span key={i.label} style={{ padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: `${i.color}15`, color: i.color }}>
          {i.val} {i.label}
        </span>
      ))}
      <span style={{ width: '1px', background: 'var(--border-color)', display: 'inline-block', margin: '0 0.25rem' }} />
      {impactItems.map(i => (
        <span key={i.label} style={{ padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.04em', background: `${i.color}15`, color: i.color }}>
          {i.val} {i.label}
        </span>
      ))}
    </div>
  );
};

// ── Main Component ──

const FestivalsCalendarPlus = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'proposals' | 'scheduled'
  const [festivals, setFestivals] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  const handleMonthClick = (i) => {
    setSelectedMonth(prev => prev === i ? null : i);
  };

  const [showProposeModal, setShowProposeModal] = useState(false);

  // Proposal form state
  const [form, setForm] = useState({
    festivalId: '',
    tourName: '',
    destination: '',
    travelMonth: 'November',
    startDate: '2026-11-01',
    endDate: '2026-11-06',
    targetPax: 25,
    pricePerPerson: 45000,
    estimatedRevenue: 1125000,
    estimatedCost: 700000,
    estimatedProfit: 425000,
    targetAudience: 'Families, HNI Luxury Travellers',
    notes: ''
  });

  const loadData = async () => {
    try {
      const festList = await dataService.getFestivals();
      setFestivals(festList || []);
      const propList = await dataService.getHolidayTourProposals();
      setProposals(propList || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isOpsOrAdmin = ['ADMIN', 'OPERATIONS'].includes(user?.role);
  const isAdmin = user?.role === 'ADMIN';

  const handleProposeSubmit = async (e) => {
    e.preventDefault();
    await dataService.saveHolidayTourProposal({
      ...form,
      estimatedRevenue: form.targetPax * form.pricePerPerson,
      estimatedProfit: (form.targetPax * form.pricePerPerson) - form.estimatedCost,
      proposedBy: user?.name || 'Operations Lead'
    });
    setShowProposeModal(false);
    loadData();
  };

  const handleApprove = async (id) => {
    await dataService.approveHolidayTourProposal(id);
    loadData();
  };

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  
  const filteredEvents = festivals.filter(f => {
    const s = new Date(f.startDate + 'T00:00:00'), end = new Date((f.endDate || f.startDate) + 'T00:00:00');
    if (s.getFullYear() !== selectedYear && end.getFullYear() !== selectedYear) return false;
    if (selectedMonth !== null && s.getMonth() !== selectedMonth && end.getMonth() !== selectedMonth) return false;
    
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.description && f.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType ? f.type === filterType : true;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));


  const scheduledProposals = proposals.filter(p => p.status === 'Approved' || p.status === 'Scheduled');
  const pendingProposals = proposals.filter(p => p.status === 'Proposed');

  return (
    <ToursLayout
      title="Festival & School Holiday Calendar+"
      subtitle="Comprehensive holiday database with connected tour planning, approval workflows, and auto-scheduling."
    >
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { id: 'events', label: 'Festivals & School Holidays', count: festivals.length },
            { id: 'proposals', label: 'Proposed Tours for Approval', count: pendingProposals.length },
            { id: 'scheduled', label: 'Scheduled Holiday Tours', count: scheduledProposals.length },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === t.id ? '#60A5FA' : 'transparent'}`,
                color: activeTab === t.id ? '#60A5FA' : 'var(--text-secondary)',
                padding: '0.6rem 0.2rem',
                fontSize: '0.85rem',
                fontWeight: activeTab === t.id ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <span>{t.label}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '1px 6px',
                borderRadius: '10px',
                background: activeTab === t.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.06)',
                color: activeTab === t.id ? '#60A5FA' : 'var(--text-tertiary)'
              }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {isOpsOrAdmin && (
          <button
            onClick={() => setShowProposeModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
          >
            <Plus size={15} /> Propose Holiday Tour
          </button>
        )}
      </div>

      {/* 1. FESTIVALS & SCHOOL HOLIDAYS DATABASE */}
      {activeTab === 'events' && (
        <div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search festivals, holidays, long weekends..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '36px', width: '100%', fontSize: '0.85rem' }}
              />
            </div>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="form-control"
              style={{ width: '180px', fontSize: '0.85rem' }}
            >
              {EVENT_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          
          {/* ── Travel Demand Heatmap ── */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', backdropFilter: 'var(--glass-blur)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                  <TrendingUp size={13} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Configured Travel Event Intensity — {selectedYear}
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                  Click a month to filter events. This is an indicator, not a booking forecast.
                </p>
              </div>
              {selectedMonth !== null && (
                <button aria-label="Clear month filter" onClick={() => setSelectedMonth(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.7rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  <X size={12} /> Clear month
                </button>
              )}
            </div>

            {selectedMonth !== null && (
              <div style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(99,102,241,0.1)', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                Showing: {MONTH_FULL[selectedMonth]} {selectedYear}
              </div>
            )}

            <HeatmapRow year={selectedYear} events={festivals} onMonthClick={handleMonthClick} />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
              {[['rgba(99,102,241,0.15)', '#818CF8', 'Lower'],['rgba(245,158,11,0.2)', '#F59E0B', 'Medium'],['rgba(239,68,68,0.2)', '#EF4444', 'Higher']].map(([bg,col,label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: bg, border: `1px solid ${col}55` }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {filteredEvents.length > 0 ? (
                <>{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}{selectedMonth !== null ? ` in ${MONTH_FULL[selectedMonth]}` : ''}</>
              ) : null}
            </div>
          </div>

          {filteredEvents.length > 0 && <MonthSummary events={filteredEvents} />}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {filteredEvents.map(event => {
              const linkedProposals = proposals.filter(p => p.festivalId === event.id);
              
              // We render the EventCard but we need to inject the proposal button in it.
              // We'll wrap EventCard in a div that holds the "Linked Tour Plans" info below it.
              return (
                <div key={event.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <EventCard
                    event={event}
                    destinations={[]} 
                    tours={[]} 
                    onClick={() => {}}
                  />
                  <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Linked Tour Plans:</span>
                      {linkedProposals.length > 0 ? (
                        <span style={{ color: '#10B981', fontWeight: 600 }}>{linkedProposals.length} Tour(s) Planned</span>
                      ) : (
                        isOpsOrAdmin && (
                          <button
                            onClick={() => {
                              setForm({ ...form, festivalId: event.id, tourName: `${event.name} Holiday Special` });
                              setShowProposeModal(true);
                            }}
                            style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                          >
                            + Propose Tour
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredEvents.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <Calendar size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>No events found</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Try adjusting your filters or search.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PROPOSED TOURS FOR APPROVAL */}
      {activeTab === 'proposals' && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Proposed Holiday Tours Awaiting Review</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
              Operations proposals linked to upcoming festival & school holiday travel windows. Approving auto-creates the tour and dispatches marketing handovers.
            </p>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '0.9rem 1rem' }}>Tour Name & Destination</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Travel Window</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Target Pax</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Projected Revenue</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Projected Profit</th>
                  <th style={{ padding: '0.9rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingProposals.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      No pending holiday tour proposals. Propose a new one above!
                    </td>
                  </tr>
                ) : (
                  pendingProposals.map(prop => (
                    <tr key={prop.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{prop.tourName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{prop.destination}</div>
                      </td>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div>{prop.travelMonth}</div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{prop.startDate} - {prop.endDate}</span>
                      </td>
                      <td style={{ padding: '0.9rem 1rem' }}>{prop.targetPax} Seats</td>
                      <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: '#60A5FA' }}>{formatINR(prop.estimatedRevenue)}</td>
                      <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#10B981' }}>{formatINR(prop.estimatedProfit)}</td>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <span className="badge monitor">Pending Approval</span>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleApprove(prop.id)}
                          className="btn btn-primary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', gap: '4px' }}
                        >
                          <CheckCircle2 size={13} /> Approve & Schedule
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SCHEDULED & APPROVED HOLIDAY TOURS */}
      {activeTab === 'scheduled' && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Approved & Scheduled Holiday Tours</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
              These tours are officially in the Tour Catalogue and have triggered Marketing campaign requirements and Sales briefings.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {scheduledProposals.map(prop => (
              <div key={prop.id} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{prop.tourName}</h4>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#10B98120', color: '#10B981', borderRadius: '4px', fontWeight: 700 }}>
                    APPROVED
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.75rem' }}>
                  <MapPin size={13} color="#60A5FA" /> {prop.destination} • {prop.startDate} to {prop.endDate}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Target Volume:</span>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{prop.targetPax} Guests</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Projected Rev:</span>
                    <div style={{ fontWeight: 700, color: '#60A5FA' }}>{formatINR(prop.estimatedRevenue)}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Approved by: {prop.approvedBy || 'Admin'}</span>
                  <span style={{ color: '#34D399' }}>✓ Synced with Marketing & Sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Propose Tour Modal */}
      {showProposeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#0F172A',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '580px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Propose Holiday Tour for Approval</h3>
              <button onClick={() => setShowProposeModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProposeSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Linked Festival / School Holiday
                </label>
                <select
                  value={form.festivalId}
                  onChange={e => setForm({ ...form, festivalId: e.target.value })}
                  className="form-control"
                  style={{ width: '100%', padding: '0.55rem' }}
                >
                  <option value="">Select Festival or Long Weekend</option>
                  {festivals.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.startDate})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Proposed Tour Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Diwali in Desert Luxury"
                    value={form.tourName}
                    onChange={e => setForm({ ...form, tourName: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Destination
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajasthan (Pushkar & Jodhpur)"
                    value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Travel Month
                  </label>
                  <select
                    value={form.travelMonth}
                    onChange={e => setForm({ ...form, travelMonth: e.target.value })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  >
                    {['August', 'September', 'October', 'November', 'December', 'January', 'February'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Target Seats
                  </label>
                  <input
                    type="number"
                    value={form.targetPax}
                    onChange={e => setForm({ ...form, targetPax: parseInt(e.target.value) || 20 })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Price / Seat (₹)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    value={form.pricePerPerson}
                    onChange={e => setForm({ ...form, pricePerPerson: parseInt(e.target.value) || 40000 })}
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Planning & Operation Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why this holiday tour is viable and what special experiences are included..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="form-control"
                  style={{ width: '100%', padding: '0.55rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowProposeModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700 }}>
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </ToursLayout>
  );
};

export default FestivalsCalendarPlus;
