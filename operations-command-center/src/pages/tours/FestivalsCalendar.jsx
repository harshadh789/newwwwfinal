import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import FestivalEditor from './FestivalEditor';
import FestivalDetail from './FestivalDetail';
import {
  Plus, Search, Filter, ChevronLeft, ChevronRight, Calendar,
  Clock, Zap, Globe, MapPin, School, List, Grid3x3, X, TrendingUp
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const EVENT_TYPES = [
  { value: '', label: 'All Events' },
  { value: 'FESTIVAL', label: 'Festivals' },
  { value: 'PUBLIC_HOLIDAY', label: 'Public Holidays' },
  { value: 'SCHOOL_HOLIDAY', label: 'School Holidays' },
  { value: 'LONG_WEEKEND', label: 'Long Weekends' },
  { value: 'TRAVEL_WINDOW', label: 'Travel Windows' },
];

const TYPE_META = {
  FESTIVAL:       { label: 'Festival',        color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  symbol: '✦' },
  PUBLIC_HOLIDAY: { label: 'Public Holiday',  color: '#60A5FA', bg: 'rgba(59,130,246,0.15)',  symbol: '⚑' },
  SCHOOL_HOLIDAY: { label: 'School Holiday',  color: '#34D399', bg: 'rgba(16,185,129,0.15)',  symbol: '◆' },
  LONG_WEEKEND:   { label: 'Long Weekend',    color: '#A78BFA', bg: 'rgba(139,92,246,0.15)',  symbol: '▲' },
  TRAVEL_WINDOW:  { label: 'Travel Window',   color: '#2DD4BF', bg: 'rgba(20,184,166,0.15)', symbol: '●' },
};

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

// ── Main Component ──────────────────────────────────────────────────────────────
const FestivalsCalendar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [events, setEvents]             = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [toast, setToast]               = useState('');

  // Filters
  const [selectedYear, setSelectedYear]     = useState(2026);
  const [selectedMonth, setSelectedMonth]   = useState(null); // null = all year
  const [filterType, setFilterType]         = useState('');
  const [filterImpact, setFilterImpact]     = useState('');
  const [filterScope, setFilterScope]       = useState('');
  const [searchQuery, setSearchQuery]       = useState('');
  const [quickWindow, setQuickWindow]       = useState(''); // '30','60','90',''

  // UI state
  const [selectedEvent, setSelectedEvent]   = useState(null);
  const [editingEvent, setEditingEvent]     = useState(null); // null = closed, {} = new, event = edit
  const [showFilters, setShowFilters]       = useState(false);

  // ── Data loading ──────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [fest, dest, trs] = await Promise.all([
        dataService.getFestivals(),
        dataService.getSeasonality(),
        dataService.getTours(),
      ]);
      setEvents(fest || []);
      setDestinations(dest || []);
      setTours(trs || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Filtering ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...events];

    // Year filter
    list = list.filter(e => new Date(e.startDate).getFullYear() === selectedYear ||
      (e.endDate && new Date(e.endDate).getFullYear() === selectedYear));

    // Quick window filter
    if (quickWindow) {
      const days = parseInt(quickWindow, 10);
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() + days);
      const today = new Date();
      list = list.filter(e => {
        const s = new Date(e.startDate), end = new Date(e.endDate || e.startDate);
        return end >= today && s <= cutoff;
      });
    }

    // Month filter
    if (selectedMonth !== null) {
      list = list.filter(e => {
        const s = new Date(e.startDate), end = new Date(e.endDate || e.startDate);
        return s.getMonth() === selectedMonth || end.getMonth() === selectedMonth;
      });
    }

    // Type filter
    if (filterType) list = list.filter(e => e.type === filterType);

    // Impact filter
    if (filterImpact) list = list.filter(e => e.travelImpact === filterImpact);

    // Scope filter
    if (filterScope) list = list.filter(e => e.geographicScope === filterScope);

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(e =>
        e.name?.toLowerCase().includes(q) ||
        e.state?.toLowerCase().includes(q) ||
        e.region?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        (e.destinationIds || []).some(id => destinations.find(d => (d.destinationId || d.id) === id)?.destinationName?.toLowerCase().includes(q)) ||
        (e.tourIds || []).some(id => tours.find(t => t.id === id)?.name?.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [events, selectedYear, selectedMonth, filterType, filterImpact, filterScope, searchQuery, quickWindow, destinations, tours]);

  // ── Admin actions ─────────────────────────────────────────────────────────────
  const handleSave = async (payload) => {
    await dataService.saveFestival(payload);
    setEditingEvent(null);
    await loadData();
    showToast(`✓ ${payload.name} saved successfully.`);
  };

  const handleArchive = async (id) => {
    await dataService.archiveFestival(id);
    setSelectedEvent(null);
    await loadData();
    showToast('Event archived.');
  };

  const handleDelete = async (id) => {
    await dataService.deleteFestival(id);
    setSelectedEvent(null);
    await loadData();
    showToast('Event deleted permanently.');
  };

  // Reset quick window when month is selected and vice versa
  const handleMonthClick = (i) => {
    setSelectedMonth(prev => prev === i ? null : i);
    setQuickWindow('');
  };
  // When quick window selected, snap year to today's year so events are visible
  const handleQuickWindow = (v) => {
    setQuickWindow(prev => prev === v ? '' : v);
    setSelectedMonth(null);
    if (v) setSelectedYear(new Date().getFullYear());
  };
  // When year changes manually, clear quick window (they'd conflict)
  const handleYearChange = (delta) => {
    setSelectedYear(y => y + delta);
    setQuickWindow('');
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  const activeFiltersCount = [filterType, filterImpact, filterScope, searchQuery.trim()].filter(Boolean).length
    + (selectedMonth !== null ? 1 : 0)
    + (quickWindow ? 1 : 0);

  return (
    <ToursLayout
      title="Festival & School Holiday Calendar"
      subtitle="Understand the travel windows that can influence GoCampFly tour demand."
    >
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {/* Left: year + quick windows */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--surface-color)', borderRadius: '8px', padding: '0.2rem', border: '1px solid var(--border-color)' }}>
            <button aria-label="Previous Year" onClick={() => handleYearChange(-1)} style={iconBtn}><ChevronLeft size={16} /></button>
            <span style={{ padding: '0.25rem 0.75rem', fontWeight: 700, fontSize: '1rem', minWidth: '60px', textAlign: 'center' }}>{selectedYear}</span>
            <button aria-label="Next Year" onClick={() => handleYearChange(1)} style={iconBtn}><ChevronRight size={16} /></button>
          </div>
          {['30', '60', '90'].map(d => (
            <button
              key={d}
              onClick={() => handleQuickWindow(d)}
              style={{
                padding: '0.35rem 0.75rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                border: '1px solid', transition: 'all 0.15s',
                borderColor: quickWindow === d ? 'var(--primary-color)' : 'var(--border-color)',
                background: quickWindow === d ? 'var(--primary-color)' : 'transparent',
                color: quickWindow === d ? '#000' : 'var(--text-secondary)',
              }}
            >
              Next {d}d
            </button>
          ))}
        </div>

        {/* Right: search + filter toggle + add */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            <input
              id="search-events"
              aria-label="Search events"
              className="form-control"
              placeholder="Search events…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2rem', width: '200px', height: '36px', fontSize: '0.85rem' }}
            />
            {searchQuery && (
              <button aria-label="Clear Search" onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0 }}><X size={14} /></button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem',
              borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              border: '1px solid',
              borderColor: showFilters || activeFiltersCount > 0 ? 'var(--primary-color)' : 'var(--border-color)',
              background: showFilters || activeFiltersCount > 0 ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: showFilters || activeFiltersCount > 0 ? 'var(--primary-color)' : 'var(--text-secondary)',
            }}
          >
            <Filter size={14} /> Filters {activeFiltersCount > 0 && <span style={{ background: 'var(--primary-color)', color: '#000', borderRadius: '10px', padding: '0 6px', fontSize: '0.7rem', fontWeight: 800 }}>{activeFiltersCount}</span>}
          </button>
          {isAdmin && (
            <button
              id="add-travel-event-btn"
              className="btn btn-primary"
              onClick={() => setEditingEvent({})}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <Plus size={16} /> Add Event
            </button>
          )}
        </div>
      </div>

      {/* ── Filter drawer ────────────────────────────────────────────────────── */}
      {showFilters && (
        <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label htmlFor="filter-type" style={labelStyle}>Event Type</label>
            <select id="filter-type" className="form-control" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ minWidth: '160px' }}>
              {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="filter-impact" style={labelStyle}>Travel Impact</label>
            <select id="filter-impact" className="form-control" value={filterImpact} onChange={e => setFilterImpact(e.target.value)} style={{ minWidth: '130px' }}>
              <option value="">All Impacts</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-scope" style={labelStyle}>Geographic Scope</label>
            <select id="filter-scope" className="form-control" value={filterScope} onChange={e => setFilterScope(e.target.value)} style={{ minWidth: '140px' }}>
              <option value="">All Scopes</option>
              <option value="NATIONAL">National</option>
              <option value="STATE">State</option>
              <option value="REGIONAL">Regional</option>
              <option value="CITY">City</option>
              <option value="INTERNATIONAL">International</option>
            </select>
          </div>
          <button
            onClick={() => { setFilterType(''); setFilterImpact(''); setFilterScope(''); setSearchQuery(''); setSelectedMonth(null); setQuickWindow(''); }}
            style={{ padding: '0.4rem 0.9rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* ── Type quick-filter pills ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {EVENT_TYPES.map(t => {
          const m = t.value ? TYPE_META[t.value] : null;
          const active = filterType === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setFilterType(t.value)}
              style={{
                padding: '0.3rem 0.9rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                border: `1px solid ${active && m ? m.color + '88' : 'var(--border-color)'}`,
                background: active && m ? m.bg : (active ? 'rgba(255,255,255,0.08)' : 'transparent'),
                color: active && m ? m.color : (active ? 'var(--text-primary)' : 'var(--text-secondary)'),
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Travel Demand Heatmap ────────────────────────────────────────────── */}
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

        {/* Month labels for selected */}
        {selectedMonth !== null && (
          <div style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(99,102,241,0.1)', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--primary-color)', fontWeight: 600 }}>
            Showing: {MONTH_FULL[selectedMonth]} {selectedYear}
          </div>
        )}

        <HeatmapRow year={selectedYear} events={events} onMonthClick={handleMonthClick} />

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
          {[['rgba(99,102,241,0.15)', '#818CF8', 'Lower'],['rgba(245,158,11,0.2)', '#F59E0B', 'Medium'],['rgba(239,68,68,0.2)', '#EF4444', 'Higher']].map(([bg,col,label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: bg, border: `1px solid ${col}55` }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Events list ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
          <Calendar size={36} style={{ marginBottom: '1rem', opacity: 0.4 }} />
          <p>Loading travel events…</p>
        </div>
      ) : (
        <>
          {/* Results header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {filtered.length > 0 ? (
                <>{filtered.length} event{filtered.length !== 1 ? 's' : ''}{selectedMonth !== null ? ` in ${MONTH_FULL[selectedMonth]}` : ''}{quickWindow ? ` in the next ${quickWindow} days` : ''}</>
              ) : null}
            </div>
          </div>

          {/* Monthly summary */}
          {filtered.length > 0 && <MonthSummary events={filtered} />}

          {/* Events grouped by month or flat list */}
          {filtered.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <Calendar size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>No events found</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {activeFiltersCount > 0 ? 'Try adjusting your filters or search.' : 'No travel events configured yet for this period.'}
              </p>
              {isAdmin && (
                <button className="btn btn-primary" onClick={() => setEditingEvent({})} style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plus size={16} /> Add First Event
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {filtered.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  destinations={destinations}
                  tours={tours}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Toast notification ────────────────────────────────────────────────── */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000,
          background: '#1E293B', border: '1px solid rgba(20,184,166,0.4)', borderRadius: '8px',
          padding: '0.75rem 1.25rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.2s ease',
        }}>
          {toast}
        </div>
      )}

      {/* ── Panels ───────────────────────────────────────────────────────────── */}
      {selectedEvent && !editingEvent && (
        <FestivalDetail
          event={selectedEvent}
          destinations={destinations}
          tours={tours}
          isAdmin={isAdmin}
          onEdit={(ev) => { setSelectedEvent(null); setEditingEvent(ev); }}
          onArchive={handleArchive}
          onDelete={handleDelete}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {editingEvent !== null && (
        <FestivalEditor
          event={editingEvent && editingEvent.id ? editingEvent : null}
          existingEvents={events}
          destinations={destinations}
          tours={tours}
          onSave={handleSave}
          onCancel={() => setEditingEvent(null)}
        />
      )}
    </ToursLayout>
  );
};

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem',
};

const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
  padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '4px',
};

export default FestivalsCalendar;
