import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, onClose, width = '480px', children }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 1100,
    background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1.5rem',
  }}>
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border-color)',
      borderRadius: '16px', width: '100%', maxWidth: width,
      maxHeight: '90vh', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', animation: 'slideUp 0.25s ease-out',
    }}>
      <div style={{
        padding: '1.15rem 1.5rem', borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0.25rem' }}
        >
          <X size={18} />
        </button>
      </div>
      <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
