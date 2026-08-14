import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/rbac';

const AuthContext = createContext(null);

// Mock Users for Demo
const MOCK_USERS = {
  'admin@gocampfly.com': { name: 'Admin User', role: 'ADMIN', department: 'Management' },
  'ops@gocampfly.com': { name: 'Rajesh K. (Ops Lead)', role: 'OPERATIONS', department: 'Operations' },
  'marketing@gocampfly.com': { name: 'Neha S. (Marketing Lead)', role: 'MARKETING', department: 'Marketing' },
  'sales@gocampfly.com': { name: 'Arjun V. (Sales Manager)', role: 'SALES', department: 'Sales' },
  'finance@gocampfly.com': { name: 'Vikram R. (Finance Controller)', role: 'FINANCE', department: 'Finance' },
  'leader@gocampfly.com': { name: 'Executive Leadership', role: 'LEADERSHIP', department: 'Leadership' },
};

const DEFAULT_USER = {
  email: 'admin@gocampfly.com',
  name: 'Admin User',
  role: 'ADMIN',
  department: 'Management'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mockSession');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(DEFAULT_USER);
        localStorage.setItem('mockSession', JSON.stringify(DEFAULT_USER));
      }
    } else {
      // Default to Admin in demo mode
      setUser(DEFAULT_USER);
      localStorage.setItem('mockSession', JSON.stringify(DEFAULT_USER));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (MOCK_USERS[email] && (password === 'password' || password === 'admin')) {
      const loggedInUser = { email, ...MOCK_USERS[email] };
      setUser(loggedInUser);
      localStorage.setItem('mockSession', JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Use role@gocampfly.com / password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockSession');
  };

  // Switch role directly (for testing RBAC & module locking)
  const switchRole = (roleKey) => {
    const matchingEmail = Object.keys(MOCK_USERS).find(e => MOCK_USERS[e].role === roleKey);
    const roleInfo = ROLES[roleKey];
    if (roleInfo) {
      const updated = {
        email: matchingEmail || `${roleKey.toLowerCase()}@gocampfly.com`,
        name: MOCK_USERS[matchingEmail]?.name || `${roleInfo.name}`,
        role: roleKey,
        department: roleInfo.department
      };
      setUser(updated);
      localStorage.setItem('mockSession', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, session: user, login, logout, switchRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
