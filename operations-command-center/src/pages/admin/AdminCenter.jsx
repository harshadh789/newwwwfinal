import React, { useState, useEffect } from 'react';
import { 
  Settings, Sliders, Shield, Users, FileText, Bell,
  CheckCircle2, Save, RefreshCw, Send, AlertTriangle, Lock, TrendingUp, IndianRupee
} from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import { ROLES } from '../../utils/rbac';
import { useAuth } from '../../context/AuthContext';

const AdminCenter = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('forecast'); // 'forecast' | 'users' | 'audit' | 'broadcast'
  const [settings, setSettings] = useState({
    forecastConversionRate: 0.30,
    avgTicketSize: 100000,
    defaultProfitMargin: 25,
    autoNotifyMarketing: true,
    autoNotifySales: true,
    targetQuarter: 'Q4 2026',
    annualTargetRevenue: 40000000
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Broadcast state
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    toDept: 'All',
    type: 'SYSTEM'
  });
  const [broadcastSent, setBroadcastSent] = useState(false);

  const loadData = async () => {
    try {
      const sysSettings = await dataService.getSystemSettings();
      if (sysSettings) setSettings(sysSettings);
      const logs = await dataService.getAuditLogs();
      setAuditLogs(logs || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dataService.saveSystemSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) return;
    await dataService.addNotification({
      title: broadcastForm.title,
      message: broadcastForm.message,
      fromDept: 'Admin',
      toDept: broadcastForm.toDept,
      type: broadcastForm.type,
      link: '/'
    });
    setBroadcastForm({ title: '', message: '', toDept: 'All', type: 'SYSTEM' });
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  // Forecast preview calculations
  const sampleLeads = 10;
  const sampleClosures = Math.round(sampleLeads * (settings.forecastConversionRate || 0.3));
  const sampleRev = sampleClosures * (settings.avgTicketSize || 100000);
  const sampleProfit = sampleRev * ((settings.defaultProfitMargin || 25) / 100);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  const filteredLogs = auditLogs.filter(l => {
    if (!searchTerm) return true;
    return l.entityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           l.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           l.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           l.details?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Admin Center</h1>
            <span style={{ fontSize: '0.72rem', background: '#EF444420', color: '#EF4444', border: '1px solid #EF444440', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
              System Governance
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Configure cross-department forecast models, role permissions, and company permanent audit logs.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ padding: '0 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', overflowX: 'auto', flexShrink: 0 }}>
        {[
          { id: 'forecast', label: 'Financial Forecast Settings', icon: Sliders },
          { id: 'users', label: 'Role & Permission Locks', icon: Users },
          { id: 'audit', label: 'Company Permanent Audit Log', icon: FileText },
          { id: 'broadcast', label: 'Cross-Department Broadcasts', icon: Bell }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 0',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === t.id ? '#60A5FA' : 'transparent'}`,
                color: activeTab === t.id ? '#60A5FA' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: activeTab === t.id ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* 1. FINANCIAL FORECAST SETTINGS */}
          {activeTab === 'forecast' && (
            <form onSubmit={handleSaveSettings}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                
                {/* Form Controls */}
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <TrendingUp size={18} color="#60A5FA" /> Forecast Engine Calibration
                  </h3>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Lead-to-Closure Conversion Rate (e.g. 0.30 = 30%)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="0.05"
                      max="1.0"
                      value={settings.forecastConversionRate}
                      onChange={e => setSettings({ ...settings, forecastConversionRate: parseFloat(e.target.value) || 0.3 })}
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                      Current setting: <strong>{Math.round((settings.forecastConversionRate || 0.3) * 100)}%</strong> of potential leads are expected to convert.
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Average Deal Ticket Size (₹ INR)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      min="10000"
                      value={settings.avgTicketSize}
                      onChange={e => setSettings({ ...settings, avgTicketSize: parseInt(e.target.value) || 100000 })}
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                      Baseline revenue assumed per closed customer booking.
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Standard Profit Margin (%)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="5"
                      max="80"
                      value={settings.defaultProfitMargin}
                      onChange={e => setSettings({ ...settings, defaultProfitMargin: parseInt(e.target.value) || 25 })}
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                      Expected gross profit percentage on projected revenue.
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Target Operating Horizon / Quarter
                    </label>
                    <select
                      value={settings.targetQuarter}
                      onChange={e => setSettings({ ...settings, targetQuarter: e.target.value })}
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    >
                      <option value="Q3 2026">Q3 2026 (Aug - Oct)</option>
                      <option value="Q4 2026">Q4 2026 (Nov - Jan)</option>
                      <option value="Q1 2027">Q1 2027 (Feb - Apr)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', fontWeight: 700, gap: '6px' }}
                  >
                    {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving System Settings...' : 'Save & Update Finance Engine'}
                  </button>

                  {saveSuccess && (
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: '#10B98120', color: '#34D399', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} /> Settings successfully saved & logged!
                    </div>
                  )}
                </div>

                {/* Live Formula Preview Box */}
                <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))', border: '1px solid #60A5FA40' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#60A5FA' }}>
                    Live Forecast Formula Preview
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    When Sales logs daily campaign feedback, the system immediately applies this formula across the Finance module:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>1. INPUT (SALES FEEDBACK)</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FCD34D' }}>{sampleLeads} Potential Leads Received</div>
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>↓ Multiply by {Math.round((settings.forecastConversionRate || 0.3) * 100)}% Conversion Rate</div>

                    <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>2. EXPECTED MINIMUM CLOSURES</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60A5FA' }}>{sampleClosures} Closed Bookings</div>
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>↓ Multiply by {formatINR(settings.avgTicketSize || 100000)} Ticket Size</div>

                    <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>3. PROJECTED REVENUE</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{formatINR(sampleRev)}</div>
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>↓ Apply {settings.defaultProfitMargin || 25}% Profit Margin</div>

                    <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.12)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <div style={{ fontSize: '0.72rem', color: '#34D399' }}>4. PROJECTED PROFIT</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981' }}>{formatINR(sampleProfit)}</div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          )}

          {/* 2. USER ROLES & PERMISSION LOCKS */}
          {activeTab === 'users' && (
            <div>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Department Roles & Module Locking Matrix</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    Each role has strict boundaries. Locked modules are shown with 🔒 in navigation.
                  </p>
                </div>
              </div>

              <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '0.9rem 1rem' }}>Role</th>
                      <th style={{ padding: '0.9rem 1rem' }}>Department</th>
                      <th style={{ padding: '0.9rem 1rem' }}>Writable Modules</th>
                      <th style={{ padding: '0.9rem 1rem' }}>Locked Modules (Restricted)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(ROLES).map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: r.badgeColor }}></span>
                          {r.name}
                        </td>
                        <td style={{ padding: '0.9rem 1rem', color: 'var(--text-secondary)' }}>{r.department}</td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          {r.id === 'ADMIN' ? (
                            <span className="badge primary">Full Read / Write All Modules</span>
                          ) : r.id === 'OPERATIONS' ? (
                            <span className="badge secondary">Catalogue, Ops Plans, Festivals+, Calendar</span>
                          ) : r.id === 'MARKETING' ? (
                            <span className="badge secondary">Campaigns, Creatives, Budget, Calendar</span>
                          ) : r.id === 'SALES' ? (
                            <span className="badge secondary">Pipeline, Targets, Daily Feedback</span>
                          ) : (
                            <span className="badge secondary">Financial Forecasts & Actuals</span>
                          )}
                        </td>
                        <td style={{ padding: '0.9rem 1rem', color: '#EF4444' }}>
                          {r.id === 'ADMIN' ? (
                            <span style={{ color: '#10B981', fontWeight: 600 }}>None (Unrestricted)</span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                              <Lock size={12} /> Other departments' internal workspaces & Admin Settings
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. COMPANY PERMANENT AUDIT LOG */}
          {activeTab === 'audit' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Company Permanent Audit Log</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    Immutable historical record of all tour creations, lifecycle changes, and cross-department activities.
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Search logs by action, tour, user..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ width: '280px', padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                />
              </div>

              <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Timestamp</th>
                      <th style={{ padding: '0.85rem 1rem' }}>User & Dept</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Action</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Entity</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                          {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                          <div>{log.user}</div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{log.department}</span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'rgba(59, 130, 246, 0.15)',
                            color: '#60A5FA',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{log.entityName || '—'}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. CROSS-DEPARTMENT BROADCASTS */}
          {activeTab === 'broadcast' && (
            <div style={{ maxWidth: '650px' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bell size={18} color="#60A5FA" /> Send Cross-Department Broadcast
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Broadcast instant notifications to all users or specific department inboxes.
                </p>

                <form onSubmit={handleSendBroadcast}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Target Department
                    </label>
                    <select
                      value={broadcastForm.toDept}
                      onChange={e => setBroadcastForm({ ...broadcastForm, toDept: e.target.value })}
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    >
                      <option value="All">All Departments (Company-Wide)</option>
                      <option value="Marketing">Marketing Team Only</option>
                      <option value="Sales">Sales Team Only</option>
                      <option value="Operations">Operations Team Only</option>
                      <option value="Finance">Finance Team Only</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Notification Headline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Q4 Target Campaign Launch Briefing"
                      value={broadcastForm.title}
                      onChange={e => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                      required
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      Message Content
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your cross-department update..."
                      value={broadcastForm.message}
                      onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                      required
                      className="form-control"
                      style={{ width: '100%', padding: '0.6rem', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', fontWeight: 700, gap: '6px' }}
                  >
                    <Send size={16} /> Broadcast Notification
                  </button>

                  {broadcastSent && (
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: '#10B98120', color: '#34D399', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} /> Notification broadcasted successfully!
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminCenter;
