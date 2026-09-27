import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-old-whiskey)', background: 'var(--bg-darkest)' }}>
      <div style={{ color: 'var(--color-dirty-amber)', fontWeight: 'bold' }}>SPINNIGHT</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>HOME</Link>
        <Link to="/profile" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PROFILE</Link>
      </div>
    </nav>
  );
};

export default Navbar;
