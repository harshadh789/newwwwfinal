export const SALES_TEAM = ['Arjun (B2B)', 'Priya (Luxury)', 'Karan (Family)', 'Riya (Adventure)', 'Admin'];
export const LEAD_STAGES = ['New', 'Contacted', 'Negotiating', 'Won', 'Lost'];
export const LEAD_TYPES = ['B2B', 'Luxury', 'Group', 'Individual', 'Other'];
export const TARGET_TYPES = ['Revenue', 'Bookings'];
export const TARGET_STATUS = ['On Track', 'Behind', 'Completed'];
export const FEEDBACK_PRIORITY = ['Low', 'Medium', 'High'];
export const FEEDBACK_STATUS = ['Open', 'Reviewed', 'Closed'];

export const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export const inputStyle = { width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.85rem' };
export const lbl = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' };
