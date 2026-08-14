import React, { useState, useMemo } from 'react';
import { Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import StatusBadge from './components/StatusBadge';
import PriorityBadge from './components/PriorityBadge';
import OwnerAvatar from './components/OwnerAvatar';
import FilterBar from './components/FilterBar';
import { TEAM_MEMBERS } from './constants';

const TeamWorkload = ({ tasks, campaigns }) => {
  const [search, setSearch] = useState('');
  const [memberFilter, setMemberFilter] = useState('ALL');

  const filteredTasks = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (memberFilter !== 'ALL' && t.assignee !== memberFilter) return false;
    return true;
  });

  const workloadByMember = useMemo(() => {
    const data = {};
    TEAM_MEMBERS.forEach(m => data[m] = { name: m, open: 0, completed: 0, overdue: 0, tasks: [] });
    filteredTasks.forEach(t => {
      const isOverdue = t.status !== 'Completed' && t.dueDate && new Date(t.dueDate) < new Date();
      if (!data[t.assignee]) data[t.assignee] = { name: t.assignee, open: 0, completed: 0, overdue: 0, tasks: [] };
      data[t.assignee].tasks.push({ ...t, isOverdue });
      if (t.status === 'Completed') data[t.assignee].completed++;
      else {
        data[t.assignee].open++;
        if (isOverdue) data[t.assignee].overdue++;
      }
    });
    return Object.values(data).filter(m => m.open > 0 || m.completed > 0 || m.name === memberFilter);
  }, [filteredTasks, memberFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search tasks..."
        filters={[
          { id: 'tw-member', label: 'Team Member', value: memberFilter, onChange: setMemberFilter, options: TEAM_MEMBERS.map(m => ({ value: m, label: m })) },
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {workloadByMember.map(member => (
          <div key={member.name} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <OwnerAvatar name={member.name} size={32} showName={false} />
                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{member.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span title="Open Tasks" style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={12} /> {member.open}</span>
                {member.overdue > 0 && <span title="Overdue Tasks" style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertCircle size={12} /> {member.overdue}</span>}
              </div>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, maxHeight: '400px', overflowY: 'auto' }}>
              {member.tasks.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', padding: '1rem 0' }}>No tasks assigned.</div>}
              {member.tasks.sort((a, b) => (a.status === 'Completed' ? 1 : -1)).map(t => {
                const campName = campaigns.find(c => c.id === t.campaignId)?.name;
                const isDone = t.status === 'Completed';
                return (
                  <div key={t.id} style={{ padding: '0.75rem', border: `1px solid ${t.isOverdue && !isDone ? 'rgba(239,68,68,0.3)' : 'var(--border-color)'}`, borderRadius: '8px', background: isDone ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)', opacity: isDone ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {isDone && <CheckCircle2 size={13} color="#10B981" />} {t.title}
                      </div>
                      <PriorityBadge priority={t.priority} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      <StatusBadge status={t.status} small />
                      <div style={{ fontSize: '0.7rem', color: t.isOverdue && !isDone ? '#EF4444' : 'var(--text-tertiary)', fontWeight: t.isOverdue && !isDone ? 700 : 400 }}>{t.dueDate || 'No Date'}</div>
                    </div>
                    {campName && <div style={{ fontSize: '0.7rem', color: '#818CF8', marginTop: '0.4rem', fontWeight: 600 }}>/ {campName}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TeamWorkload;
