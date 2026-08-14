import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Campfly" style={{ height: '48px', marginBottom: '1rem' }} />
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Strategic Operating Cockpit</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Version 2.1</p>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="role@gocampfly.com"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          <p>Demo Accounts:</p>
          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
            <li>admin@gocampfly.com</li>
            <li>leader@gocampfly.com</li>
            <li>marketing@gocampfly.com</li>
            <li>sales@gocampfly.com</li>
            <li>ops@gocampfly.com</li>
            <li>finance@gocampfly.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
