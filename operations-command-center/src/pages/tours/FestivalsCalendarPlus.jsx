import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import {
  Calendar, Plus, Search, Filter, CheckCircle2, Clock, Zap, Globe,
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

const TYPE_META = {
  FESTIVAL:       { label: 'Festival',        color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  symbol: '✦' },
  PUBLIC_HOLIDAY: { label: 'Public Holiday',  color: '#60A5FA', bg: 'rgba(59,130,246,0.15)',  symbol: '⚑' },
  SCHOOL_HOLIDAY: { label: 'School Holiday',  color: '#34D399', bg: 'rgba(16,185,129,0.15)',  symbol: '◆' },
  LONG_WEEKEND:   { label: 'Long Weekend',    color: '#A78BFA', bg: 'rgba(139,92,246,0.15)',  symbol: '▲' },
};

const FestivalsCalendarPlus = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'proposals' | 'scheduled'
  const [festivals, setFestivals] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
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
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.description && f.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType ? f.type === filterType : true;
    return matchesSearch && matchesType;
  });

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

          {/* Grid of events */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filteredEvents.map(event => {
              const meta = TYPE_META[event.type] || TYPE_META.FESTIVAL;
              const linkedProposals = proposals.filter(p => p.festivalId === event.id);

              return (
                <div key={event.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: meta.bg,
                        color: meta.color,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: `1px solid ${meta.color}40`
                      }}>
                        {meta.symbol} {meta.label}
                      </span>

                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: event.travelImpact === 'HIGH' ? '#EF4444' : '#F59E0B',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {event.travelImpact} IMPACT
                      </span>
                    </div>

                    <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{event.name}</h3>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {event.startDate} {event.endDate && event.endDate !== event.startDate ? `to ${event.endDate}` : ''}
                    </p>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {event.whyItMatters || event.description}
                    </p>
                  </div>

                  {/* Linked Holiday Tours Status */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Linked Tour Plans:</span>
                      {linkedProposals.length > 0 ? (
                        <span style={{ color: '#10B981', fontWeight: 600 }}>{linkedProposals.length} Tour(s) Planned</span>
                      ) : (
                        <button
                          onClick={() => {
                            setForm({ ...form, festivalId: event.id, tourName: `${event.name} Holiday Special` });
                            setShowProposeModal(true);
                          }}
                          style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          + Propose Tour
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
