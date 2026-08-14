import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock Users for Demo
const MOCK_USERS = {
  'admin@gocampfly.com': { name: 'Admin User', role: 'ADMIN', department: 'All' },
  'leader@gocampfly.com': { name: 'Leadership User', role: 'LEADERSHIP', department: 'Leadership' },
  'marketing@gocampfly.com': { name: 'Marketing User', role: 'MARKETING', department: 'Marketing' },
  'sales@gocampfly.com': { name: 'Sales User', role: 'SALES', department: 'Sales' },
  'ops@gocampfly.com': { name: 'Operations User', role: 'OPERATIONS', department: 'Operations' },
  'finance@gocampfly.com': { name: 'Finance User', role: 'FINANCE', department: 'Finance' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mockSession');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (MOCK_USERS[email] && password === 'password') {
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
