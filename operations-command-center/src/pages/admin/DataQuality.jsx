import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, Info, RefreshCw, 
  ExternalLink, ArrowRight, Activity, Layers, Megaphone, TrendingUp, DollarSign
} from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import { useNavigate } from 'react-router-dom';

const DataQuality = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const runScan = async () => {
    setLoading(true);
    try {
      const result = await dataService.runDataQualityScan();
      setScanResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runScan();
  }, []);

  if (loading || !scanResult) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)' }}>
        <RefreshCw size={20} className="animate-spin" style={{ marginRight: '8px' }} />
        Running Cross-Department Data Quality Scan...
      </div>
    );
  }

  const { overallScore, stats, moduleScores, issues, scannedAt } = scanResult;

  const filteredIssues = issues.filter(i => {
    if (filterSeverity === 'ALL') return true;
    return i.severity === filterSeverity;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Data Quality & Health Engine</h1>
            <span style={{
              fontSize: '0.72rem',
              background: overallScore >= 90 ? '#10B98120' : '#F59E0B20',
              color: overallScore >= 90 ? '#34D399' : '#FBBF24',
              border: `1px solid ${overallScore >= 90 ? '#10B98140' : '#F59E0B40'}`,
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 700
            }}>
              {overallScore}% Operational Health
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Automated integrity scanner detecting missing prices, unlinked campaigns, overdue follow-ups, and orphaned records.
          </p>
        </div>

        <button
          onClick={runScan}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          <RefreshCw size={15} /> Re-scan Database
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top Score Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            
            {/* Overall Health Card */}
            <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>OVERALL HEALTH</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0.25rem 0' }}>{overallScore}%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {stats.totalIssues === 0 ? 'All records clean & connected' : `${stats.totalIssues} actionable items detected`}
              </div>
            </div>

            {/* Critical Issues */}
            <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #EF4444' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>CRITICAL ISSUES</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EF4444', margin: '0.25rem 0' }}>{stats.critical}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Requires immediate ops/pricing fix</div>
            </div>

            {/* Warnings */}
            <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>WARNINGS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B', margin: '0.25rem 0' }}>{stats.warning}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Missing dates / briefings</div>
            </div>

            {/* Info / Gaps */}
            <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #60A5FA' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>SYNC GAPS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60A5FA', margin: '0.25rem 0' }}>{stats.info}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Pending feedback / reminders</div>
            </div>

          </div>

          {/* Department-wise Health Breakdown */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Departmental Health Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Layers size={14} color="#3B82F6" /> Operations</span>
                  <span style={{ color: '#3B82F6' }}>{moduleScores.operations}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${moduleScores.operations}%`, height: '100%', background: '#3B82F6' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Megaphone size={14} color="#EC4899" /> Marketing</span>
                  <span style={{ color: '#EC4899' }}>{moduleScores.marketing}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${moduleScores.marketing}%`, height: '100%', background: '#EC4899' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14} color="#10B981" /> Sales</span>
                  <span style={{ color: '#10B981' }}>{moduleScores.sales}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${moduleScores.sales}%`, height: '100%', background: '#10B981' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} color="#F59E0B" /> Finance</span>
                  <span style={{ color: '#F59E0B' }}>{moduleScores.finance}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${moduleScores.finance}%`, height: '100%', background: '#F59E0B' }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Actionable Issue List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Actionable Issue Log ({filteredIssues.length})</h3>
              
              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(sev => (
                  <button
                    key={sev}
                    onClick={() => setFilterSeverity(sev)}
                    style={{
                      background: filterSeverity === sev ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                      color: filterSeverity === sev ? '#60A5FA' : 'var(--text-secondary)',
                      border: `1px solid ${filterSeverity === sev ? '#60A5FA50' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {sev === 'ALL' ? 'All Issues' : sev}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.9rem 1rem' }}>Severity</th>
                    <th style={{ padding: '0.9rem 1rem' }}>Module</th>
                    <th style={{ padding: '0.9rem 1rem' }}>Issue Description</th>
                    <th style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                        <CheckCircle2 size={24} color="#10B981" style={{ marginBottom: '6px', display: 'inline-block' }} />
                        <div>No data quality issues found for this filter!</div>
                      </td>
                    </tr>
                  ) : (
                    filteredIssues.map(issue => (
                      <tr key={issue.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            background: issue.severity === 'CRITICAL' ? '#EF444420' : (issue.severity === 'WARNING' ? '#F59E0B20' : '#60A5FA20'),
                            color: issue.severity === 'CRITICAL' ? '#EF4444' : (issue.severity === 'WARNING' ? '#F59E0B' : '#60A5FA'),
                            border: `1px solid ${issue.severity === 'CRITICAL' ? '#EF444440' : (issue.severity === 'WARNING' ? '#F59E0B40' : '#60A5FA40')}`
                          }}>
                            {issue.severity}
                          </span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 600 }}>{issue.module}</td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{issue.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{issue.description}</div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                          <button
                            onClick={() => navigate(issue.link)}
                            className="btn btn-secondary"
                            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', gap: '4px' }}
                          >
                            Resolve <ArrowRight size={13} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataQuality;
