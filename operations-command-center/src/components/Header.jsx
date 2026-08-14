import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/rbac';
import { dataService } from '../services/MockDataService';
import { 
  Bell, Shield, CheckCircle2, AlertTriangle, ExternalLink,
  ChevronDown, UserCheck, RefreshCw, X, Sparkles, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [filterDept, setFilterDept] = useState('ALL');
  const [healthScore, setHealthScore] = useState(94);
  const notifRef = useRef(null);
  const roleRef = useRef(null);

  const loadNotifications = async () => {
    try {
      const list = await dataService.getNotifications();
      setNotifications(list || []);
      const scan = await dataService.runDataQualityScan();
      if (scan?.overallScore) setHealthScore(scan.overallScore);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = async () => {
    await dataService.markAllNotificationsRead();
    loadNotifications();
  };

  const handleNotifClick = async (notif) => {
    await dataService.markNotificationRead(notif.id);
    setShowNotifDropdown(false);
    loadNotifications();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filterDept === 'ALL') return true;
    return n.toDept === filterDept || n.toDept === 'All';
  });

  const activeRole = user?.role || 'ADMIN';
  const roleMeta = ROLES[activeRole] || ROLES.ADMIN;

  return (
    <header style={{
      height: '60px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      gap: '1rem'
    }}>
      {/* Left: V3.0 Branding & Live Department Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0.25rem 0.65rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#C084FC',
          letterSpacing: '0.03em'
        }}>
          <Sparkles size={13} color="#C084FC" />
          <span>v3.0 Connected Operations</span>
        </div>

        {/* Quick Health Link */}
        <button
          onClick={() => navigate('/data-quality')}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer'
          }}
          title="Automated Data Quality & Health Score"
        >
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: healthScore >= 90 ? '#10B981' : (healthScore >= 75 ? '#F59E0B' : '#EF4444'),
            display: 'inline-block'
          }}></span>
          Health: <strong style={{ color: 'var(--text-primary)' }}>{healthScore}%</strong>
        </button>
      </div>

      {/* Right: Actions (Role Switcher & Notification Bell & Profile) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Role Switcher dropdown for instant RBAC Testing */}
        <div style={{ position: 'relative' }} ref={roleRef}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${roleMeta.badgeColor}40`,
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: roleMeta.badgeColor
            }}></span>
            <span>Role: <strong style={{ color: roleMeta.badgeColor }}>{roleMeta.name}</strong></span>
            <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          {showRoleDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '260px',
              background: '#0F172A',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
              padding: '0.5rem',
              zIndex: 1000
            }}>
              <div style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.3rem' }}>
                SWITCH ROLE & TEST PERMISSIONS
              </div>
              {Object.values(ROLES).map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    switchRole(r.id);
                    setShowRoleDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeRole === r.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeRole === r.id ? '#60A5FA' : 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '2px',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: activeRole === r.id ? '#fff' : 'inherit' }}>
                      {r.name}
                    </span>
                    {activeRole === r.id && <CheckCircle2 size={13} color="#60A5FA" />}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    {r.department} Department
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Notification Bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            style={{
              background: showNotifDropdown ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              position: 'relative'
            }}
            title="Cross-Department Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#fff',
                borderRadius: '50%',
                fontSize: '0.65rem',
                fontWeight: 800,
                minWidth: '17px',
                height: '17px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showNotifDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '380px',
              maxHeight: '480px',
              background: '#0F172A',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              {/* Notif Header */}
              <div style={{
                padding: '0.9rem 1rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Cross-Department Alerts</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{unreadCount} unread updates</div>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#60A5FA',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Department Filter tabs */}
              <div style={{
                display: 'flex',
                gap: '4px',
                padding: '0.4rem 0.8rem',
                background: 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                overflowX: 'auto'
              }}>
                {['ALL', 'Marketing', 'Sales', 'Operations', 'Finance', 'Admin'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setFilterDept(dept)}
                    style={{
                      background: filterDept === dept ? 'rgba(59, 130, 246, 0.2)' : 'none',
                      color: filterDept === dept ? '#60A5FA' : 'var(--text-tertiary)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.7rem',
                      fontWeight: filterDept === dept ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Notif List */}
              <div style={{ flex: 1, overflowY: 'auto', maxHeight: '340px' }}>
                {filteredNotifs.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                    No notifications for this filter.
                  </div>
                ) : (
                  filteredNotifs.map(n => (
                    <div
                      key={n.id}
                      onClick={() => handleNotifClick(n)}
                      style={{
                        padding: '0.8rem 1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: n.read ? 'transparent' : 'rgba(59, 130, 246, 0.06)',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        display: 'flex',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: n.read ? 'transparent' : '#3B82F6',
                        marginTop: '6px',
                        flexShrink: 0
                      }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: n.read ? 600 : 700, color: n.read ? 'var(--text-primary)' : '#fff' }}>
                            {n.title}
                          </span>
                          <span style={{
                            fontSize: '0.65rem',
                            padding: '1px 5px',
                            borderRadius: '3px',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'var(--text-tertiary)'
                          }}>
                            {n.fromDept} → {n.toDept}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {n.message}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {n.link && (
                            <span style={{ fontSize: '0.7rem', color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              View Module <ExternalLink size={10} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.6rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: roleMeta.badgeColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800
          }}>
            {user?.name ? user.name[0] : 'A'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {user?.name || 'Admin User'}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
              {roleMeta.department}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
