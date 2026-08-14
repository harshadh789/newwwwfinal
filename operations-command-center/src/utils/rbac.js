// Role-Based Access Control (RBAC) & Module Locking Definitions for Version 3.0

export const ROLES = {
  ADMIN: {
    id: 'ADMIN',
    name: 'Admin / Executive',
    department: 'Management',
    badgeColor: '#EF4444',
    description: 'Full unconstrained access to all company modules, settings, and workflows.'
  },
  OPERATIONS: {
    id: 'OPERATIONS',
    name: 'Operations Lead',
    department: 'Operations',
    badgeColor: '#3B82F6',
    description: 'Manage Tour Catalogue, Operations Calendar, Confirmed Tours, Planning (Plan→Create→Execute→Post), and Festival Calendar+.'
  },
  MARKETING: {
    id: 'MARKETING',
    name: 'Marketing Lead',
    department: 'Marketing',
    badgeColor: '#EC4899',
    description: 'Manage Campaigns, Content Calendar, Goals/OKRs, Budget, and view Operations Tour Handovers.'
  },
  SALES: {
    id: 'SALES',
    name: 'Sales Manager',
    department: 'Sales',
    badgeColor: '#10B981',
    description: 'Manage Pipeline Targets, Opportunities, Product Knowledge Briefings, and Daily Campaign Feedback.'
  },
  FINANCE: {
    id: 'FINANCE',
    name: 'Finance Controller',
    department: 'Finance',
    badgeColor: '#F59E0B',
    description: 'View consolidated Financial Forecasts (Early & Pipeline) and Actual Revenue & Profit.'
  },
  LEADERSHIP: {
    id: 'LEADERSHIP',
    name: 'Executive Leadership',
    department: 'Leadership',
    badgeColor: '#8B5CF6',
    description: 'Strategic vision, company alignment, and executive KPI cockpit view.'
  }
};

// Module access matrix
export const MODULE_PERMISSIONS = {
  '/': {
    name: 'Executive Overview',
    allowedRoles: ['ADMIN', 'LEADERSHIP', 'MARKETING', 'SALES', 'OPERATIONS', 'FINANCE'],
    writeRoles: ['ADMIN', 'LEADERSHIP']
  },
  '/vision-mission': {
    name: 'Vision & Mission',
    allowedRoles: ['ADMIN', 'LEADERSHIP', 'MARKETING', 'SALES', 'OPERATIONS', 'FINANCE'],
    writeRoles: ['ADMIN', 'LEADERSHIP']
  },
  '/strategic-plan': {
    name: 'Strategic Plan',
    allowedRoles: ['ADMIN', 'LEADERSHIP', 'MARKETING', 'SALES', 'OPERATIONS', 'FINANCE'],
    writeRoles: ['ADMIN', 'LEADERSHIP']
  },
  '/strategic-priorities': {
    name: 'Strategic Priorities',
    allowedRoles: ['ADMIN', 'LEADERSHIP', 'MARKETING', 'SALES', 'OPERATIONS', 'FINANCE'],
    writeRoles: ['ADMIN', 'LEADERSHIP']
  },
  '/tours/portfolio': {
    name: 'Tour Catalogue',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'MARKETING', 'SALES', 'LEADERSHIP', 'FINANCE'],
    writeRoles: ['ADMIN', 'OPERATIONS']
  },
  '/tours/calendar': {
    name: 'Operations Tour Calendar',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'MARKETING', 'SALES', 'LEADERSHIP'],
    writeRoles: ['ADMIN', 'OPERATIONS']
  },
  '/tours/confirmed': {
    name: 'Confirmed Tours',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'MARKETING', 'SALES', 'LEADERSHIP', 'FINANCE'],
    writeRoles: ['ADMIN', 'OPERATIONS']
  },
  '/tours/planning': {
    name: 'Operations Planning',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'LEADERSHIP'],
    writeRoles: ['ADMIN', 'OPERATIONS']
  },
  '/tours/festivals': {
    name: 'Festival & School Holiday Calendar+',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'MARKETING', 'SALES', 'LEADERSHIP'],
    writeRoles: ['ADMIN', 'OPERATIONS']
  },
  '/marketing-strategy': {
    name: 'Marketing Strategy',
    allowedRoles: ['ADMIN', 'MARKETING', 'LEADERSHIP', 'OPERATIONS'],
    writeRoles: ['ADMIN', 'MARKETING']
  },
  '/sales-strategy': {
    name: 'Sales Strategy',
    allowedRoles: ['ADMIN', 'SALES', 'LEADERSHIP', 'MARKETING'],
    writeRoles: ['ADMIN', 'SALES']
  },
  '/finance-planning': {
    name: 'Finance Module',
    allowedRoles: ['ADMIN', 'FINANCE', 'LEADERSHIP'],
    writeRoles: ['ADMIN', 'FINANCE']
  },
  '/alignment-matrix': {
    name: 'Company Alignment',
    allowedRoles: ['ADMIN', 'LEADERSHIP', 'MARKETING', 'SALES', 'OPERATIONS', 'FINANCE'],
    writeRoles: ['ADMIN']
  },
  '/admin': {
    name: 'Admin Center',
    allowedRoles: ['ADMIN'],
    writeRoles: ['ADMIN']
  },
  '/data-quality': {
    name: 'Data Quality',
    allowedRoles: ['ADMIN', 'OPERATIONS', 'MARKETING', 'SALES', 'FINANCE', 'LEADERSHIP'],
    writeRoles: ['ADMIN']
  }
};

export const canAccessRoute = (role, path) => {
  if (!role || role === 'ADMIN') return true;
  const config = MODULE_PERMISSIONS[path];
  if (!config) return true;
  return config.allowedRoles.includes(role);
};

export const canEditRoute = (role, path) => {
  if (!role || role === 'ADMIN') return true;
  const config = MODULE_PERMISSIONS[path];
  if (!config) return false;
  return config.writeRoles.includes(role);
};

export const getLockedReason = (role, path) => {
  const config = MODULE_PERMISSIONS[path];
  if (!config) return null;
  if (!canAccessRoute(role, path)) {
    return {
      type: 'ACCESS_RESTRICTED',
      moduleName: config.name,
      allowedRoles: config.allowedRoles.map(r => ROLES[r]?.name || r).join(', '),
      message: `Your current role (${ROLES[role]?.name || role}) is locked out of ${config.name}. This module is restricted to ${config.allowedRoles.join(' & ')}.`
    };
  }
  return null;
};
