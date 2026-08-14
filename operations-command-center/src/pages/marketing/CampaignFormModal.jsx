import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { inputStyle, lbl, FUNNEL_CATEGORIES, STAGES, MONTH_FULL, ALL_CHANNELS } from './constants';

const CAMPAIGN_PRIORITIES = ['Low', 'Medium', 'High'];

const CampaignFormModal = ({ onClose, onSave, editingCampaign = null }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    funnelCategory: FUNNEL_CATEGORIES[0].value,
    promotionStage: STAGES[0].value,
    promotionStart: MONTH_FULL[0],
    promotionEnd: MONTH_FULL[1],
    priority: 'Medium',
    targetAudience: '',
    contentStrategy: '',
    channels: [],
    notes: '',
  });

  useEffect(() => {
    if (editingCampaign) {
      setForm({
        ...editingCampaign,
        channels: editingCampaign.channels || [],
      });
    }
  }, [editingCampaign]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const toggleChannel = (ch) => {
    setForm(p => ({
      ...p,
      channels: p.channels.includes(ch) ? p.channels.filter(c => c !== ch) : [...p.channels, ch]
    }));
  };

  return (
    <Modal title={editingCampaign ? "Edit Campaign" : "Create Campaign"} onClose={onClose} width="560px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div>
          <label htmlFor="c-name" style={lbl}>Campaign Name *</label>
          <input id="c-name" style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Q4 Festive Push" required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="c-cat" style={lbl}>Category</label>
            <input id="c-cat" style={inputStyle} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Corporate, Festive" />
          </div>
          <div>
            <label htmlFor="c-funnel" style={lbl}>Funnel Stage</label>
            <select id="c-funnel" style={inputStyle} value={form.funnelCategory} onChange={e => setForm(p => ({ ...p, funnelCategory: e.target.value }))}>
              {FUNNEL_CATEGORIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="c-stage" style={lbl}>Promotion Stage</label>
            <select id="c-stage" style={inputStyle} value={form.promotionStage} onChange={e => setForm(p => ({ ...p, promotionStage: e.target.value }))}>
              {STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="c-start" style={lbl}>Start Month</label>
            <select id="c-start" style={inputStyle} value={form.promotionStart} onChange={e => setForm(p => ({ ...p, promotionStart: e.target.value }))}>
              {MONTH_FULL.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="c-end" style={lbl}>End Month</label>
            <select id="c-end" style={inputStyle} value={form.promotionEnd} onChange={e => setForm(p => ({ ...p, promotionEnd: e.target.value }))}>
              {MONTH_FULL.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="c-priority" style={lbl}>Priority</label>
          <select id="c-priority" style={inputStyle} value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
            {CAMPAIGN_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="c-aud" style={lbl}>Target Audience</label>
          <input id="c-aud" style={inputStyle} value={form.targetAudience} onChange={e => setForm(p => ({ ...p, targetAudience: e.target.value }))} placeholder="e.g. HNI Families" />
        </div>

        <div>
          <label htmlFor="c-strat" style={lbl}>Content Strategy</label>
          <textarea id="c-strat" style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.contentStrategy} onChange={e => setForm(p => ({ ...p, contentStrategy: e.target.value }))} placeholder="Describe the strategy..." />
        </div>

        <div>
          <label style={lbl}>Channels</label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {ALL_CHANNELS.map(ch => (
              <button
                key={ch}
                type="button"
                onClick={() => toggleChannel(ch)}
                style={{
                  padding: '0.35rem 0.65rem', borderRadius: '20px', border: `1px solid ${form.channels.includes(ch) ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  background: form.channels.includes(ch) ? 'rgba(52,211,153,0.1)' : 'transparent',
                  color: form.channels.includes(ch) ? 'var(--primary-color)' : 'var(--text-tertiary)',
                  fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.15s'
                }}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="c-notes" style={lbl}>Notes</label>
          <textarea id="c-notes" style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Additional notes..." />
        </div>

        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} style={{ padding: '0.55rem 1.25rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>{editingCampaign ? 'Save Changes' : 'Create Campaign'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default CampaignFormModal;
