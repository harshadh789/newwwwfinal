import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import Modal from '../marketing/components/Modal';
import FeedbackEntry from './FeedbackEntry';
import { FEEDBACK_STATUS } from './constants';
import { TEAM_MEMBERS } from '../marketing/constants';

const FeedbackHistoryModal = ({ campaign, feedback, onClose, isAdmin, onEdit, onDelete }) => {
  const [dateRange, setDateRange] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ownerFilter, setOwnerFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredFeedback = useMemo(() => {
    const now = new Date();
    const rangeDate = new Date();
    if (dateRange !== 'ALL') {
      rangeDate.setDate(now.getDate() - parseInt(dateRange));
    }

    return (feedback || []).filter(f => {
      const fDate = new Date(f.date);
      if (dateRange !== 'ALL' && fDate < rangeDate) return false;
      if (statusFilter !== 'ALL' && f.status !== statusFilter) return false;
      if (ownerFilter !== 'ALL' && f.owner !== ownerFilter) return false;
      if (priorityFilter !== 'ALL' && f.priority !== priorityFilter) return false;
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [feedback, dateRange, statusFilter, ownerFilter, priorityFilter]);

  return (
    <Modal 
      title={`Feedback History: ${campaign?.name}`} 
      onClose={onClose} 
      width="800px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '75vh' }}>
        
        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Filter size={14} /> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Filter History:</span>
          </div>
          
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ padding: '0.3rem 0.6rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
            <option value="ALL">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="14">Last 14 Days</option>
            <option value="30">Last 30 Days</option>
          </select>

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.3rem 0.6rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
            <option value="ALL">All Feedback Statuses</option>
            {FEEDBACK_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: '0.3rem 0.6rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          
          <select value={ownerFilter} onChange={e => setOwnerFilter(e.target.value)} style={{ padding: '0.3rem 0.6rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
            <option value="ALL">All Owners</option>
            {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {filteredFeedback.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
              No feedback entries match your filters.
            </div>
          ) : (
            filteredFeedback.map((f, idx, arr) => (
              <FeedbackEntry 
                key={f.id} 
                f={f} 
                idx={idx} 
                isLast={idx === arr.length - 1} 
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackHistoryModal;
