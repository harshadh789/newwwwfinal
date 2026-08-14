import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/MockDataService';
import { useAuth } from '../../context/AuthContext';
import ToursLayout from './ToursLayout';
import { Search, Plus, ExternalLink, MapPin, DollarSign, Target, Calendar, Layers } from 'lucide-react';

const TourPortfolio = () => {
  const { session } = useAuth();
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allTours = await dataService.getTours();
    setTours(allTours || []);
  };

  const isAdmin = session?.role === 'ADMIN';

  const filteredTours = tours.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion ? t.region === filterRegion : true;
    return matchesSearch && matchesRegion;
  });

  const regions = [...new Set(tours.map(t => t.region).filter(Boolean))];

  return (
    <ToursLayout 
      title="Tour Portfolio" 
      subtitle="The complete GoCampFly tour and product universe. Master reference for all operations."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <div className="search-box" style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search tours, destinations..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', width: '100%' }}
            />
          </div>
          <select 
            className="form-control" 
            value={filterRegion} 
            onChange={e => setFilterRegion(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => alert('Add Tour Modal to be implemented.')}>
            <Plus size={18} /> Add New Tour
          </button>
        )}
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredTours.map(tour => (
          <div key={tour.id} className="card" onClick={() => setSelectedTour(tour)} style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-4px)' } }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-color)' }}>{tour.name}</h3>
                <span className={`status-badge status-${tour.status?.toLowerCase() || 'active'}`}>{tour.status || 'ACTIVE'}</span>
              </div>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} /> {tour.destination}, {tour.region}
              </p>
            </div>
            <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Type</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tour.category} / {tour.domesticInternational}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Duration</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }}/>{tour.typicalDuration || 'N/A'}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>USP</div>
                <div style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  {tour.usp?.primary || 'USP not yet configured'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="empty-state" style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface-color)', borderRadius: '8px' }}>
          <Layers size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
          <h3>No tours found</h3>
          <p className="text-secondary">Try adjusting your filters or add a new tour to the portfolio.</p>
        </div>
      )}

      {selectedTour && (
        <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} isAdmin={isAdmin} />
      )}
    </ToursLayout>
  );
};

const TourDetailModal = ({ tour, onClose, isAdmin }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem'
    }}>
      <div style={{
        background: 'var(--bg-color)', borderRadius: '8px', width: '100%', maxWidth: '800px',
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>{tour.name}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              <span><MapPin size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {tour.destination}</span>
              <span className={`status-badge status-${tour.status?.toLowerCase() || 'active'}`}>{tour.status || 'ACTIVE'}</span>
            </div>
          </div>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
        
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Basic Info */}
          <section>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>BASIC INFORMATION</h3>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div><label>Category:</label> <div style={{fontWeight: 500}}>{tour.category}</div></div>
              <div><label>Region:</label> <div style={{fontWeight: 500}}>{tour.region}</div></div>
              <div><label>Type:</label> <div style={{fontWeight: 500}}>{tour.domesticInternational}</div></div>
              <div><label>Duration:</label> <div style={{fontWeight: 500}}>{tour.typicalDuration || 'N/A'}</div></div>
              <div style={{ gridColumn: 'span 2' }}><label>Best Travel Months:</label> <div style={{fontWeight: 500}}>{tour.bestMonths?.join(', ') || 'N/A'}</div></div>
            </div>
          </section>

          {/* Business Info */}
          <section>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>BUSINESS INFORMATION</h3>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div><label>Reference Price:</label> <div style={{fontWeight: 600, color: 'var(--success-color)'}}>₹{tour.referencePrice?.toLocaleString() || 'N/A'}</div></div>
              <div><label>Expected Margin:</label> <div style={{fontWeight: 600}}>{tour.expectedMargin ? `${tour.expectedMargin}%` : 'N/A'}</div></div>
              <div><label>Strategic Priority:</label> <div style={{fontWeight: 500}}>{tour.strategicPriorityId ? 'Linked' : 'None'}</div></div>
            </div>
          </section>

          {/* Market Info */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>MARKET INFORMATION</h3>
              {isAdmin && <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit Market Price</button>}
            </div>
            {tour.marketPricing && tour.marketPricing.length > 0 ? (
              <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Current Market Reference</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success-color)' }}>₹{tour.marketPricing[0].price?.toLocaleString()}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tour.marketPricing[0].priceType}</div>
                  </div>
                  <div>
                    <div><strong>Source:</strong> {tour.marketPricing[0].source}</div>
                    <div><strong>Checked:</strong> {tour.marketPricing[0].checkedAt}</div>
                  </div>
                </div>
                {tour.marketPricing[0].notes && (
                  <div style={{ marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'italic', borderLeft: '3px solid var(--primary-color)', paddingLeft: '1rem' }}>
                    "{tour.marketPricing[0].notes}"
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Market price not available</div>
            )}
          </section>

          {/* USP */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>WHY GO CAMP FLY?</h3>
              {isAdmin && <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit USP</button>}
            </div>
            {tour.usp?.primary ? (
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-color)', marginTop: 0 }}>"{tour.usp.primary}"</p>
                {tour.usp.differentiators?.length > 0 && (
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                    {tour.usp.differentiators.map((diff, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{diff}</li>)}
                  </ul>
                )}
              </div>
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>USP not yet configured</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TourPortfolio;
