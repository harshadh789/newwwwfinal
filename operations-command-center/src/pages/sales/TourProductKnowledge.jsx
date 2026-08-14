import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, MapPin, CheckCircle2, DollarSign, Users,
  HelpCircle, ShieldCheck, ChevronRight, Search, ExternalLink
} from 'lucide-react';

const TourProductKnowledge = ({ tours = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTour, setSelectedTour] = useState(tours[0] || null);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  const filteredTours = tours.filter(t => {
    return t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           t.destination.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={18} color="#10B981" /> Operations → Sales Product Knowledge & Destination Briefing
            </h3>
            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', fontWeight: 700 }}>
              Live Operations Sync
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Study destination USPs, pricing tiers, objection handling, and target personas before speaking to customer leads.
          </p>
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search destination briefings..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '32px', width: '100%', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Split View: Tour List Left / Detailed Briefing Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem', alignItems: 'start' }}>
        
        {/* Left: Tours Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredTours.map(t => {
            const isSelected = selectedTour?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTour(t)}
                className="card"
                style={{
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  border: isSelected ? '1px solid #60A5FA' : '1px solid var(--border-color)',
                  borderRadius: '10px',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#fff' : 'var(--text-primary)' }}>
                      {t.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                      <MapPin size={11} color="#60A5FA" /> {t.destination} • {t.travelMonth}
                    </span>
                  </div>
                  <ChevronRight size={16} color={isSelected ? '#60A5FA' : 'var(--text-tertiary)'} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Tour Briefing Sheet */}
        {selectedTour && (
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Title Header */}
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase' }}>
                  PRODUCT KNOWLEDGE DOSSIER
                </span>
                <h2 style={{ margin: '0.2rem 0', fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                  {selectedTour.name}
                </h2>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>📍 Destination: <strong>{selectedTour.destination}</strong></span>
                  <span>🗓 Travel Month: <strong>{selectedTour.travelMonth}</strong></span>
                  <span>🏷 Category: <strong>{selectedTour.category || 'Domestic FIT'}</strong></span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Base Price / Person</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>
                  {formatINR(selectedTour.salesBriefing?.minPrice || 35000)}
                </div>
              </div>
            </div>

            {/* 3 Core Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              {/* USPs Block */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={15} /> Key USPs to Pitch
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {(selectedTour.salesBriefing?.usps || [
                    'Exclusive luxury accommodation with verified safety audits',
                    'Zero hidden itinerary costs — fully inclusive private transfers',
                    'Dedicated on-ground GoCampFly tour experience manager'
                  ]).map((usp, i) => (
                    <li key={i}><strong style={{ color: '#fff' }}>{usp}</strong></li>
                  ))}
                </ul>
              </div>

              {/* Target Persona Block */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Users size={15} /> Ideal Customer Profile & Pre-Qualification
                </h4>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedTour.salesBriefing?.targetPersona || selectedTour.marketing?.targetAudience || 'HNIs, luxury families, and corporate executives.'}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  <strong>Key Lead Question:</strong> "Are you looking for a structured private luxury experience or budget group travel?"
                </div>
              </div>

            </div>

            {/* Objection Handling Cheat Sheet */}
            <div style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', fontWeight: 700, color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} /> Sales Objection Handling Cheat Sheet
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
                <div>
                  <span style={{ color: '#FCD34D', fontWeight: 700 }}>Q: "Why is GoCampFly priced higher than local aggregators?"</span>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                    A: Explain our end-to-end verified operations, private luxury vehicles, 24/7 dedicated trip concierge, and guaranteed premium stays.
                  </div>
                </div>
                <div>
                  <span style={{ color: '#FCD34D', fontWeight: 700 }}>Q: "Can we customize dates or add private helicopter transfers?"</span>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                    A: Yes, our FIT operations engine supports custom add-ons and private helicopter charter pricing.
                  </div>
                </div>
              </div>
            </div>

            {/* Key Messages to reinforce */}
            {selectedTour.marketing?.keyMessages && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                <strong>Official Brand Talking Points:</strong> {selectedTour.marketing.keyMessages.join(' • ')}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default TourProductKnowledge;
