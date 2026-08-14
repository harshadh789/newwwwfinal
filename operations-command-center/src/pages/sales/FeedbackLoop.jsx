import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Megaphone, Star, Target, CheckCircle2, ChevronRight, History, Archive, Activity } from 'lucide-react';
import { dataService } from '../../services/MockDataService';
import StatusBadge from '../marketing/components/StatusBadge';
import PriorityBadge from '../marketing/components/PriorityBadge';
import FilterBar from '../marketing/components/FilterBar';
import Modal from '../marketing/components/Modal';
import FeedbackReports from './FeedbackReports';
import FeedbackEntry from './FeedbackEntry';
import FeedbackHistoryModal from './FeedbackHistoryModal';
import { SALES_TEAM, FEEDBACK_PRIORITY, FEEDBACK_STATUS, inputStyle, lbl } from './constants';
import { TEAM_MEMBERS, FUNNEL_CATEGORIES } from '../marketing/constants';
import { AlertCircle, Calendar } from 'lucide-react';

const FeedbackLoop = ({ feedback, campaigns, isAdmin, loadData }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived' | 'escalations'
  const [currentView, setCurrentView] = useState('logs'); // 'logs' | 'reports'
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [historyModalCampaignId, setHistoryModalCampaignId] = useState(null);
  const [escalations, setEscalations] = useState([]);

  // Fetch escalations
  useEffect(() => {
    dataService.getSalesEscalations().then(setEscalations);
  }, []);

  const handleResolveEscalation = async (id) => {
    await dataService.resolveEscalation(id);
    dataService.getSalesEscalations().then(setEscalations);
  };

  const pendingEscalations = escalations.filter(e => e.status === 'Pending').length;

  const defaultForm = { 
    campaignId: '', 
    date: new Date().toISOString().split('T')[0],
    author: SALES_TEAM[0], 
    owner: TEAM_MEMBERS[0],
    leadQuality: 3, 
    priority: 'Medium', 
    status: 'Open', 
    whatWorks: '',
    whatNeedsImprovement: '',
    actionPlan: '',
    totalLeads: '',
    potentialLeads: '',
    dailyClosing: '',
    closedRevenue: '',
    closedProfit: ''
  };

  const [form, setForm] = useState(defaultForm);

  const filteredCampaigns = (campaigns || []).filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeTab === 'active' && c.promotionStage === 'Closed') return false;
    if (activeTab === 'archived' && c.promotionStage !== 'Closed') return false;
    return true;
  });

  const openAdd = (campaignId) => { 
    setEditing(null); 
    setSelectedCampaignId(campaignId);
    setForm({ ...defaultForm, campaignId }); 
    setShowModal(true); 
  };

  const openEdit = (f) => { 
    setEditing(f); 
    setSelectedCampaignId(f.campaignId);
    setForm({ ...f }); 
    setShowModal(true); 
  };

  const handleDelete = async (id) => { 
    if (window.confirm('Delete this feedback?')) { 
      await dataService.deleteSalesFeedback(id); 
      loadData(); 
    } 
  };

  const handleSave = async (e) => { 
    e.preventDefault(); 
    const savedData = editing ? { ...form, id: editing.id } : { ...form };
    await dataService.saveSalesFeedback(savedData); 
    setShowModal(false); 
    loadData(); 
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={14} fill={star <= rating ? '#F59E0B' : 'transparent'} color={star <= rating ? '#F59E0B' : 'var(--border-color)'} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Level View Toggle */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
        <button 
          onClick={() => setCurrentView('logs')} 
          style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem', fontWeight: 700, color: currentView === 'logs' ? 'var(--primary-color)' : 'var(--text-tertiary)', borderBottom: currentView === 'logs' ? '2px solid var(--primary-color)' : '2px solid transparent', cursor: 'pointer' }}
        >
          Daily Logs
        </button>
        <button 
          onClick={() => setCurrentView('reports')} 
          style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem', fontWeight: 700, color: currentView === 'reports' ? 'var(--primary-color)' : 'var(--text-tertiary)', borderBottom: currentView === 'reports' ? '2px solid var(--primary-color)' : '2px solid transparent', cursor: 'pointer' }}
        >
          Feedback Reports
        </button>
      </div>

      {currentView === 'reports' ? (
        <FeedbackReports feedback={feedback} campaigns={campaigns} />
      ) : (
        <>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <History size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Daily Campaign Feedback</h2>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Track lead quality and sync observations with Marketing on a daily basis. Campaigns move to the Archive once closed.
              </p>
            </div>
          </div>

      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search campaigns...">
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button onClick={() => setActiveTab('active')} className={`btn ${activeTab === 'active' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: activeTab !== 'active' ? 'transparent' : '', color: activeTab !== 'active' ? 'var(--text-secondary)' : '' }}>
            <Activity size={14} /> Active
          </button>
          <button onClick={() => setActiveTab('archived')} className={`btn ${activeTab === 'archived' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: activeTab !== 'archived' ? 'transparent' : '', color: activeTab !== 'archived' ? 'var(--text-secondary)' : '' }}>
            <Archive size={14} /> Archive
          </button>
          <button onClick={() => setActiveTab('escalations')} className={`btn ${activeTab === 'escalations' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: activeTab !== 'escalations' ? 'transparent' : '', color: activeTab !== 'escalations' ? 'var(--text-secondary)' : '', position: 'relative' }}>
            <AlertCircle size={14} /> Escalations
            {pendingEscalations > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#EF4444', color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                {pendingEscalations}
              </span>
            )}
          </button>
        </div>
      </FilterBar>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activeTab === 'escalations' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {escalations.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No missed feedback escalations found.</div>}
            {escalations.map(esc => (
              <div key={esc.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: esc.status === 'Pending' ? '#EF4444' : '#10B981' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <AlertCircle size={16} color={esc.status === 'Pending' ? '#EF4444' : '#10B981'} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Missed Feedback: {campaigns?.find(c => c.id === esc.campaignId)?.name || 'Unknown Campaign'}</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: esc.status === 'Pending' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: esc.status === 'Pending' ? '#EF4444' : '#10B981', fontWeight: 600 }}>{esc.status}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span><strong style={{ color: 'var(--text-primary)' }}>Sales Person:</strong> {esc.salesPerson}</span>
                    <span><strong style={{ color: 'var(--text-primary)' }}>Missed Date:</strong> {esc.missedDate}</span>
                  </div>
                  {esc.notes && <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>{esc.notes}</div>}
                </div>
                {esc.status === 'Pending' && (
                  <button onClick={() => handleResolveEscalation(esc.id)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Resolve
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredCampaigns.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No campaigns found in this view.</div>}
            {filteredCampaigns.map(campaign => {
          const campaignFeedback = (feedback || [])
            .filter(fb => fb.campaignId === campaign.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
            
          const funnelCategory = FUNNEL_CATEGORIES.find(fc => fc.value === campaign.funnelCategory) || FUNNEL_CATEGORIES[0];
          
          return (
            <div key={campaign.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
              
              {/* Campaign Header */}
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-color)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <Target size={20} color="var(--primary-color)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{campaign.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
                      <span style={{ fontSize: '0.7rem', color: funnelCategory.color, background: funnelCategory.bg, padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>{funnelCategory.label}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>• {campaign.promotionStart} - {campaign.promotionEnd}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    {campaignFeedback.length} Feedback Entries
                  </div>
                  <StatusBadge status={campaign.promotionStage} />
                  {activeTab === 'active' && (
                    <button onClick={() => openAdd(campaign.id)} className="btn btn-primary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Plus size={14} /> Log Daily
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback History Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {campaignFeedback.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem', padding: '1rem' }}>
                    No feedback history for this campaign yet.
                  </div>
                ) : (
                  <>
                    {/* Render ONLY the most recent feedback inline */}
                    <FeedbackEntry 
                      f={campaignFeedback[0]} 
                      idx={0} 
                      isLast={true} 
                      isAdmin={isAdmin} 
                      onEdit={openEdit} 
                      onDelete={handleDelete} 
                    />
                    
                    {campaignFeedback.length > 1 && (
                      <button 
                        onClick={() => setHistoryModalCampaignId(campaign.id)} 
                        style={{ alignSelf: 'center', background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <History size={14} /> View Full History ({campaignFeedback.length - 1} more)
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
        </>
        )}
      </div>

      {/* History Modal */}
      {historyModalCampaignId && (
        <FeedbackHistoryModal 
          campaign={campaigns?.find(c => c.id === historyModalCampaignId)}
          feedback={(feedback || []).filter(fb => fb.campaignId === historyModalCampaignId)}
          onClose={() => setHistoryModalCampaignId(null)}
          isAdmin={isAdmin}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit Daily Feedback' : 'Log Daily Feedback'} onClose={() => setShowModal(false)} width="600px">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Read-only campaign display in modal */}
            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target size={18} color="var(--primary-color)" />
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  {campaigns?.find(c => c.id === form.campaignId)?.name || 'Campaign'}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} color="var(--text-secondary)" />
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required style={{ ...inputStyle, padding: '0.2rem 0.5rem', width: 'auto', background: 'transparent' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label htmlFor="sf-qual" style={lbl}>Lead Quality (1-5)</label>
                <input type="number" id="sf-qual" min="1" max="5" style={inputStyle} value={form.leadQuality} onChange={e => setForm(p => ({ ...p, leadQuality: parseInt(e.target.value) }))} required />
              </div>
              <div>
                <label htmlFor="sf-total" style={lbl}>Total Leads</label>
                <input type="number" id="sf-total" min="0" style={inputStyle} value={form.totalLeads} onChange={e => setForm(p => ({ ...p, totalLeads: e.target.value ? parseInt(e.target.value) : '' }))} />
              </div>
              <div>
                <label htmlFor="sf-pot" style={lbl}>Potential Leads</label>
                <input type="number" id="sf-pot" min="0" style={inputStyle} value={form.potentialLeads} onChange={e => setForm(p => ({ ...p, potentialLeads: e.target.value ? parseInt(e.target.value) : '' }))} />
              </div>
              <div>
                <label htmlFor="sf-closed" style={lbl}>Deals Closed</label>
                <input type="number" id="sf-closed" min="0" style={inputStyle} value={form.dailyClosing} onChange={e => setForm(p => ({ ...p, dailyClosing: e.target.value ? parseInt(e.target.value) : '' }))} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label htmlFor="sf-rev" style={lbl}>Closed Revenue (₹)</label>
                <input type="number" id="sf-rev" min="0" style={inputStyle} value={form.closedRevenue} onChange={e => setForm(p => ({ ...p, closedRevenue: e.target.value ? parseInt(e.target.value) : '' }))} />
              </div>
              <div>
                <label htmlFor="sf-profit" style={lbl}>Closed Profit (₹)</label>
                <input type="number" id="sf-profit" min="0" style={inputStyle} value={form.closedProfit} onChange={e => setForm(p => ({ ...p, closedProfit: e.target.value ? parseInt(e.target.value) : '' }))} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="sf-author" style={lbl}>Sales Reporter *</label><select id="sf-author" style={inputStyle} value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} required>{SALES_TEAM.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
              <div><label htmlFor="sf-owner" style={lbl}>Marketing Owner *</label><select id="sf-owner" style={inputStyle} value={form.owner} onChange={e => setForm(p => ({ ...p, owner: e.target.value }))} required>{TEAM_MEMBERS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label htmlFor="sf-pri" style={lbl}>Priority</label><select id="sf-pri" style={inputStyle} value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>{FEEDBACK_PRIORITY.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              <div><label htmlFor="sf-status" style={lbl}>Feedback Status</label><select id="sf-status" style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>{FEEDBACK_STATUS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            </div>

            <div>
              <label htmlFor="sf-ww" style={lbl}>Sales Observations (What's Working)</label>
              <textarea id="sf-ww" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.whatWorks} onChange={e => setForm(p => ({ ...p, whatWorks: e.target.value }))} placeholder="E.g., Leads are highly qualified and ready to buy..." />
            </div>

            <div>
              <label htmlFor="sf-ni" style={lbl}>Sales Feedback: Needs Improvement</label>
              <textarea id="sf-ni" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.whatNeedsImprovement} onChange={e => setForm(p => ({ ...p, whatNeedsImprovement: e.target.value }))} placeholder="E.g., Leads are dropping off due to budget mismatch..." />
            </div>

            <div>
              <label htmlFor="sf-ap" style={lbl}>Sales Recommended Actions</label>
              <textarea id="sf-ap" style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.actionPlan} onChange={e => setForm(p => ({ ...p, actionPlan: e.target.value }))} placeholder="E.g., Update ad copy to clearly state starting price..." />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Daily Feedback</button>
            </div>
          </form>
        </Modal>
      )}
      
        </>
      )}
    </div>
  );
};

export default FeedbackLoop;
