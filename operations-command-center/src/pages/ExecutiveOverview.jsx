import React, { useEffect, useState } from 'react';
import { dataService } from '../services/MockDataService';
import { useAuth } from '../context/AuthContext';

const ExecutiveOverview = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const companyData = await dataService.getCompanyStrategy();
      const planData = await dataService.getStrategicPlan();
      setData({ company: companyData, plan: planData });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading Executive Overview...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">Executive Overview</h1>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>GoCampFly Strategic Operating Cockpit</p>
        </div>
        <div style={{ background: 'var(--card-border)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
          Logged in as: <strong>{user?.name}</strong> ({user?.role})
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Vision</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.company.vision}</p>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Mission</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.company.mission}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Current Strategic Direction</h2>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{data.company.longTermDirection}</p>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Business Position</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {/* Revenue Card */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>Revenue</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>₹10.0L</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Plan</span><span>₹12.0L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Forecast</span><span>₹11.0L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', paddingTop: '0.25rem', borderTop: '1px solid var(--card-border)' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Variance</span><span style={{ color: 'var(--accent-red)' }}>-₹2.0L</span>
            </div>
          </div>
        </div>

        {/* Production Card */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>Production</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>₹3.5L</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Plan</span><span>₹4.0L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Forecast</span><span>₹3.8L</span>
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>Profit</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>₹6.5L</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Plan</span><span>₹8.0L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Forecast</span><span>₹7.2L</span>
            </div>
          </div>
        </div>

        {/* Margin Card */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>Margin</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>65.0%</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Plan</span><span>66.0%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Forecast</span><span>65.5%</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ExecutiveOverview;
