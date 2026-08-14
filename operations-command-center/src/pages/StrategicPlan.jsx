import React, { useEffect, useState } from 'react';
import { dataService } from '../services/MockDataService';
import { useAuth } from '../context/AuthContext';

const Field = ({ label, value }) => {
  if (!value) return null;
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{label}</h3>
      <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontWeight: 300 }}>{value}</p>
    </div>
  );
};

const EditField = ({ label, value, onChange, type = 'text' }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', minHeight: '100px', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' }}
      />
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'inherit' }}
      />
    )}
  </div>
);

const StrategicPlan = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('10YEAR');
  const [editData, setEditData] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const plan = await dataService.getStrategicPlan();
    setData(plan);
    setEditData(JSON.parse(JSON.stringify(plan)));
    setLoading(false);
  };

  const handleEdit = () => {
    setEditData(JSON.parse(JSON.stringify(data)));
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (window.confirm('Discard unsaved changes?')) {
      setIsEditing(false);
      setEditData(JSON.parse(JSON.stringify(data)));
    }
  };

  const handleSave = async () => {
    try {
      const updated = await dataService.updateStrategicPlan(editData);
      setData(updated);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Error saving Strategic Plan');
    }
  };

  const updateField = (horizon, field, value) => {
    setEditData(prev => ({
      ...prev,
      [horizon]: {
        ...prev[horizon],
        [field]: value
      }
    }));
  };

  if (loading || !data) return <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Loading Strategic Plan...</div>;

  const isAdmin = user?.role === 'ADMIN';
  const start = isEditing ? Number(editData.startingYear) : Number(data.startingYear);
  
  const ranges = {
    '10YEAR': `${start}–${start + 9}`,
    '5YEAR': `${start}–${start + 4}`,
    '3YEAR': `${start}–${start + 2}`,
    '1YEAR': `${start}`,
    '3MONTH': `Q3 ${start}`,
    '1MONTH': `August ${start}`
  };

  const renderReadView = () => {
    const section = data[
      activeTab === '10YEAR' ? 'tenYear' : 
      activeTab === '5YEAR' ? 'fiveYear' : 
      activeTab === '3YEAR' ? 'threeYear' : 
      activeTab === '1YEAR' ? 'oneYear' : 
      activeTab === '3MONTH' ? 'threeMonth' : 'oneMonth'
    ];

    if (!section || (!section.direction && !section.destination && !section.objective && !section.strategicFocus)) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          The {activeTab.replace('YEAR', '-Year').replace('MONTH', '-Month')} Plan has not been configured yet.
        </div>
      );
    }

    return (
      <div style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          {activeTab.replace('YEAR', '-Year').replace('MONTH', '-Month')} {['10YEAR', '5YEAR', '3YEAR'].includes(activeTab) ? 'Direction & Plan' : 'Strategy'} 
          <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginLeft: '1rem' }}>{ranges[activeTab]}</span>
        </h2>
        
        {activeTab === '10YEAR' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <Field label="Long-Term Vision" value={section.direction} />
            <Field label="Business Direction" value={section.businessDirection} />
            <Field label="Market Position" value={section.marketPosition} />
            <Field label="Customer Direction" value={section.customerDirection} />
            <Field label="Tour Portfolio Direction" value={section.tourPortfolioDirection} />
            <Field label="Financial Direction" value={section.financialDirection} />
          </div>
        )}
        {activeTab === '5YEAR' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <Field label="5-Year Destination" value={section.destination} />
            <Field label="Market Expansion" value={section.marketExpansion} />
            <Field label="Operations Direction" value={section.operationsDirection} />
            <Field label="Financial Direction" value={section.financialDirection} />
          </div>
        )}
        {activeTab === '3YEAR' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <Field label="3-Year Destination" value={section.destination} />
          </div>
        )}
        {activeTab === '1YEAR' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <Field label="Annual Company Objective" value={section.objective} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <Field label="Revenue Target" value={section.revenueTarget ? `₹${section.revenueTarget.toLocaleString()}` : ''} />
              <Field label="Profit Target" value={section.profitTarget ? `₹${section.profitTarget.toLocaleString()}` : ''} />
              <Field label="Margin Target" value={section.marginTarget ? `${section.marginTarget}%` : ''} />
            </div>
            <Field label="Marketing Direction" value={section.marketingDirection} />
            <Field label="Sales Direction" value={section.salesDirection} />
            <Field label="Operations Direction" value={section.operationsDirection} />
            <Field label="Finance Direction" value={section.financeDirection} />
          </div>
        )}
        {['3MONTH', '1MONTH'].includes(activeTab) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <Field label="Strategic Focus" value={section.strategicFocus} />
            <Field label="Marketing Direction" value={section.marketingDirection} />
            <Field label="Sales Direction" value={section.salesDirection} />
            <Field label="Operations Direction" value={section.operationsDirection} />
            <Field label="Finance Direction" value={section.financeDirection} />
          </div>
        )}
      </div>
    );
  };

  const renderEditView = () => {
    const horizonKey = activeTab === '10YEAR' ? 'tenYear' : activeTab === '5YEAR' ? 'fiveYear' : activeTab === '3YEAR' ? 'threeYear' : activeTab === '1YEAR' ? 'oneYear' : activeTab === '3MONTH' ? 'threeMonth' : 'oneMonth';
    const section = editData[horizonKey];

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Edit {activeTab.replace('YEAR', '-Year').replace('MONTH', '-Month')}</h2>
          <div style={{ fontSize: '1.125rem', color: 'var(--primary-color)', fontWeight: 600 }}>{ranges[activeTab]}</div>
        </div>
        
        {activeTab === '10YEAR' && (
          <>
            <EditField label="Long-Term Vision" type="textarea" value={section.direction} onChange={(v) => updateField(horizonKey, 'direction', v)} />
            <EditField label="Business Direction" type="textarea" value={section.businessDirection} onChange={(v) => updateField(horizonKey, 'businessDirection', v)} />
            <EditField label="Market Position" type="textarea" value={section.marketPosition} onChange={(v) => updateField(horizonKey, 'marketPosition', v)} />
            <EditField label="Customer Direction" type="textarea" value={section.customerDirection} onChange={(v) => updateField(horizonKey, 'customerDirection', v)} />
            <EditField label="Tour Portfolio Direction" type="textarea" value={section.tourPortfolioDirection} onChange={(v) => updateField(horizonKey, 'tourPortfolioDirection', v)} />
            <EditField label="Financial Direction" type="textarea" value={section.financialDirection} onChange={(v) => updateField(horizonKey, 'financialDirection', v)} />
          </>
        )}
        {activeTab === '5YEAR' && (
          <>
            <EditField label="5-Year Destination" type="textarea" value={section.destination} onChange={(v) => updateField(horizonKey, 'destination', v)} />
            <EditField label="Market Expansion" type="textarea" value={section.marketExpansion} onChange={(v) => updateField(horizonKey, 'marketExpansion', v)} />
            <EditField label="Operations Direction" type="textarea" value={section.operationsDirection} onChange={(v) => updateField(horizonKey, 'operationsDirection', v)} />
            <EditField label="Financial Direction" type="textarea" value={section.financialDirection} onChange={(v) => updateField(horizonKey, 'financialDirection', v)} />
          </>
        )}
        {activeTab === '3YEAR' && (
          <>
            <EditField label="3-Year Destination" type="textarea" value={section.destination} onChange={(v) => updateField(horizonKey, 'destination', v)} />
          </>
        )}
        {activeTab === '1YEAR' && (
          <>
            <EditField label="Annual Company Objective" type="textarea" value={section.objective} onChange={(v) => updateField(horizonKey, 'objective', v)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <EditField label="Revenue Target (₹)" type="number" value={section.revenueTarget} onChange={(v) => updateField(horizonKey, 'revenueTarget', Number(v))} />
              <EditField label="Profit Target (₹)" type="number" value={section.profitTarget} onChange={(v) => updateField(horizonKey, 'profitTarget', Number(v))} />
              <EditField label="Margin Target (%)" type="number" value={section.marginTarget} onChange={(v) => updateField(horizonKey, 'marginTarget', Number(v))} />
            </div>
            <EditField label="Marketing Direction" type="textarea" value={section.marketingDirection} onChange={(v) => updateField(horizonKey, 'marketingDirection', v)} />
            <EditField label="Sales Direction" type="textarea" value={section.salesDirection} onChange={(v) => updateField(horizonKey, 'salesDirection', v)} />
            <EditField label="Operations Direction" type="textarea" value={section.operationsDirection} onChange={(v) => updateField(horizonKey, 'operationsDirection', v)} />
            <EditField label="Finance Direction" type="textarea" value={section.financeDirection} onChange={(v) => updateField(horizonKey, 'financeDirection', v)} />
          </>
        )}
        {['3MONTH', '1MONTH'].includes(activeTab) && (
          <>
            <EditField label="Strategic Focus" type="textarea" value={section.strategicFocus} onChange={(v) => updateField(horizonKey, 'strategicFocus', v)} />
            <EditField label="Marketing Direction" type="textarea" value={section.marketingDirection} onChange={(v) => updateField(horizonKey, 'marketingDirection', v)} />
            <EditField label="Sales Direction" type="textarea" value={section.salesDirection} onChange={(v) => updateField(horizonKey, 'salesDirection', v)} />
            <EditField label="Operations Direction" type="textarea" value={section.operationsDirection} onChange={(v) => updateField(horizonKey, 'operationsDirection', v)} />
            <EditField label="Finance Direction" type="textarea" value={section.financeDirection} onChange={(v) => updateField(horizonKey, 'financeDirection', v)} />
          </>
        )}
      </div>
    );
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Not available';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>GoCampFly Strategic Plan</h1>
          <div style={{ fontSize: '1.125rem', color: 'var(--primary-color)', fontWeight: 600 }}>
            {isEditing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                Strategic Starting Year: 
                <input 
                  type="number" 
                  value={editData.startingYear} 
                  onChange={(e) => setEditData({...editData, startingYear: Number(e.target.value)})} 
                  style={{ padding: '0.25rem 0.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--primary-color)', borderRadius: '4px', color: 'var(--primary-color)', fontWeight: 700, width: '100px' }}
                />
              </div>
            ) : (
              `Strategic Starting Year: ${data.startingYear}`
            )}
          </div>
        </div>
        
        {isAdmin && !isEditing && (
          <button 
            onClick={handleEdit}
            style={{ padding: '0.75rem 1.5rem', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Edit Strategic Plan
          </button>
        )}
        {isEditing && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleCancel} style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Save Changes</button>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--accent-green)' }}>
          Strategic Plan updated successfully.
        </div>
      )}

      {/* STRATEGIC CASCADE VISUALIZATION */}
      {!isEditing && (
        <div className="card" style={{ marginBottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Strategic Cascade</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>10-YEAR DIRECTION</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"Where are we going?"</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>5-YEAR PLAN</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"Where should we be?"</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>3-YEAR PLAN</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"What major transformation must happen?"</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>1-YEAR PLAN</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"What must we achieve this year?"</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>3-MONTH STRATEGY</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"What are we focusing on this quarter?"</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: '0.5rem' }}>1-MONTH STRATEGY</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>"What matters now?"</div>
            </div>
          </div>
        </div>
      )}

      {/* HORIZON SELECTOR */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
        {['10YEAR', '5YEAR', '3YEAR', '1YEAR', '3MONTH', '1MONTH'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem 1.5rem',
              background: activeTab === tab ? 'rgba(0, 184, 184, 0.1)' : 'var(--card-bg)',
              color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--primary-color)' : 'var(--card-border)'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              minWidth: '140px',
              textAlign: 'center',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <div style={{ marginBottom: '0.25rem' }}>{tab.replace('YEAR', ' YEAR').replace('MONTH', ' MONTH')}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>{ranges[tab]}</div>
          </button>
        ))}
      </div>

      <div className="card" style={{ minHeight: '400px' }}>
        {isEditing ? renderEditView() : renderReadView()}
      </div>

      {!isEditing && (
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>
            <span style={{ color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>Status:</span> 
            <span style={{ color: 'var(--accent-green)', fontWeight: 600, padding: '0.25rem 0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}>Published</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>Last updated:</span> 
            {data.updatedAt ? formatDate(data.updatedAt) : 'Never'}
          </div>
          <div>
            <span style={{ color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>Updated by:</span> 
            {data.updatedBy || 'N/A'}
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicPlan;
