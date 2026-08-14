import React from 'react';
import { Star, CheckCircle2, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import StatusBadge from '../marketing/components/StatusBadge';
import PriorityBadge from '../marketing/components/PriorityBadge';
import OwnerAvatar from '../marketing/components/OwnerAvatar';

const FeedbackEntry = ({ f, idx = 0, isLast = true, isAdmin, onEdit, onDelete }) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: !isLast ? '1.25rem' : '0', borderBottom: !isLast ? '1px solid var(--border-color)' : 'none' }}>
      {/* Meta Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{f.date}</div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Quality:</span>
            {renderStars(f.leadQuality)}
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Leads: <strong style={{ color: 'var(--text-primary)' }}>{f.totalLeads || 0}</strong></span>
            <span style={{ color: 'var(--text-secondary)' }}>Potential: <strong style={{ color: '#10B981' }}>{f.potentialLeads || 0}</strong></span>
            <span style={{ color: 'var(--text-secondary)' }}>Closed: <strong style={{ color: '#3B82F6' }}>{f.dailyClosing || 0}</strong></span>
            {(f.closedRevenue > 0) && (
              <>
                <span style={{ color: 'var(--border-color)' }}>|</span>
                <span style={{ color: 'var(--text-secondary)' }}>Revenue: <strong style={{ color: '#10B981' }}>₹{f.closedRevenue?.toLocaleString()}</strong></span>
                <span style={{ color: 'var(--text-secondary)' }}>Profit: <strong style={{ color: '#10B981' }}>₹{f.closedProfit?.toLocaleString()}</strong></span>
              </>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <PriorityBadge priority={f.priority} />
          <StatusBadge status={f.status} />
          {isAdmin && (
            <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.5rem' }}>
              <button onClick={() => onEdit(f)} aria-label="Edit feedback" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><Edit3 size={14} /></button>
              <button onClick={() => onDelete(f.id)} aria-label="Delete feedback" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Content Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={12} /> Sales Observations (What's Working)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {f.whatWorks || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>None</span>}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
              Sales Feedback: Needs Improvement
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {f.whatNeedsImprovement || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>None</span>}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
              Sales Recommended Actions
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {f.actionPlan || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>None</span>}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem' }}>Sales Reporter</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <OwnerAvatar name={f.author} size={20} showName={false} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{f.author}</span>
              </div>
            </div>
            <ChevronRight size={14} color="var(--text-tertiary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem' }}>Marketing Owner</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <OwnerAvatar name={f.owner} size={20} showName={false} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{f.owner}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackEntry;
