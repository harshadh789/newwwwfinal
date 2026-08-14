import React from 'react';
import { Camera, Briefcase, Mail, Search, MessageCircle, Video, Globe } from 'lucide-react';

// Shared constants used across marketing tabs

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const MONTH_IDX = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };

export const ALL_CHANNELS = ['Instagram', 'LinkedIn', 'Facebook', 'Email Newsletter', 'SEO/Blog', 'YouTube', 'WhatsApp'];

export const FUNNEL_CATEGORIES = [
  { value: 'Awareness',   label: 'Awareness',   color: '#818CF8', bg: 'rgba(129,140,248,0.15)' },
  { value: 'Engagement',  label: 'Engagement',  color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { value: 'Traffic',     label: 'Traffic',     color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  { value: 'Leads',       label: 'Leads',       color: '#EC4899', bg: 'rgba(236,72,153,0.15)' },
  { value: 'Conversions', label: 'Conversions', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { value: 'Retention',   label: 'Retention',   color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
];

export const STAGES = [
  { value: 'Planning',        label: 'Planning',         color: '#6B7280', bg: 'rgba(107,114,128,0.15)' },
  { value: 'Early Promotion', label: 'Early Promotion',  color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { value: 'Active',          label: 'Active',            color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { value: 'Post-Promotion',  label: 'Post-Promotion',   color: '#818CF8', bg: 'rgba(129,140,248,0.15)' },
  { value: 'Closed',          label: 'Closed',           color: '#9CA3AF', bg: 'rgba(156,163,175,0.15)' },
];

export const CHANNEL_ICONS = {
  Instagram:          <Camera size={14} />,
  LinkedIn:           <Briefcase size={14} />,
  Facebook:           <Globe size={14} />,
  'Email Newsletter': <Mail size={14} />,
  'SEO/Blog':         <Search size={14} />,
  YouTube:            <Video size={14} />,
  WhatsApp:           <MessageCircle size={14} />,
};

export const TEAM_MEMBERS = ['Rahul M.', 'Neha S.', 'Vikram R.', 'Pooja K.', 'Admin'];

export const BUDGET_CATEGORIES = ['Ad Spend', 'Creative Production', 'Tools & Software', 'Events & Sponsorships', 'Influencer & Partnerships', 'Other'];

export const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

export const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.55rem 0.75rem',
  background: 'var(--bg-secondary, #1e293b)',
  border: '1px solid var(--border-color, #334155)',
  borderRadius: '8px',
  color: 'var(--text-primary, #f8fafc)',
  fontSize: '0.85rem',
  outline: 'none',
};

export const lbl = {
  display: 'block', fontSize: '0.72rem', fontWeight: 700,
  color: 'var(--text-tertiary)', textTransform: 'uppercase',
  letterSpacing: '0.06em', marginBottom: '0.35rem',
};
