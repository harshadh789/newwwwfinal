import React from 'react';
import { Users, Briefcase, Compass, Home } from 'lucide-react';

const SEGMENTS = [
  {
    id: 's1',
    name: 'High Net Worth (HNW)',
    icon: Home,
    color: '#818CF8',
    description: 'Premium packages, private tours, luxury seekers.',
    painPoints: ['Lack of exclusivity', 'Poor logistics', 'Crowded experiences'],
    salesPitch: 'Focus on privacy, bespoke itineraries, and premium 5-star ground handling. Mention the helicopter add-ons.',
  },
  {
    id: 's2',
    name: 'Corporate Teams (B2B)',
    icon: Briefcase,
    color: '#10B981',
    description: 'Offsite leadership retreats, team building.',
    painPoints: ['Difficult group coordination', 'Lack of meeting spaces', 'Boring itineraries'],
    salesPitch: 'Emphasize end-to-end management, dedicated account managers, and unique team-building activities (e.g., guided treks).',
  },
  {
    id: 's3',
    name: 'Adventure Enthusiasts',
    icon: Compass,
    color: '#F59E0B',
    description: 'High difficulty, remote access, experienced trekkers.',
    painPoints: ['Safety concerns', 'Inexperienced guides', 'Generic routes'],
    salesPitch: 'Highlight our certified mountain guides, medical protocols, and access to off-the-beaten-path trails like Chadar.',
  },
  {
    id: 's4',
    name: 'Families',
    icon: Users,
    color: '#EC4899',
    description: 'Safe, curated luxury experiences for all ages.',
    painPoints: ['Unsafe environments', 'Dietary restrictions', 'Boredom for kids'],
    salesPitch: 'Focus on safety, customized menus (Jain/Kid-friendly options), and engaging family-centric activities like houseboat stays.',
  }
];

const CustomerSegments = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {SEGMENTS.map(s => (
          <div key={s.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 800 }}>{s.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{s.description}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Key Pain Points</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {s.painPoints.map(pp => <li key={pp}>{pp}</li>)}
                </ul>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Recommended Pitch</div>
                <div style={{ fontSize: '0.85rem', color: '#10B981', fontStyle: 'italic', lineHeight: 1.4 }}>"{s.salesPitch}"</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSegments;
