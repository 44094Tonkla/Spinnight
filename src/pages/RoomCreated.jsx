import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState.jsx';
import '../styles/global.css';

const RoomCreated = () => {
  const { gameState, loading } = useGameState();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (gameState?.roomCode) {
      navigator.clipboard.writeText(gameState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-main)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>ROOM CREATED</h2>
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>YOUR ROOM CODE</p>
        <h1 style={{ fontSize: '3rem', color: 'var(--danger-gold)', marginBottom: '2rem', letterSpacing: '4px' }}>
          {loading ? "LOADING..." : (gameState?.roomCode || "N/A")}
        </h1>
        <button onClick={handleCopy} className="secondary-button" style={{ width: '100%', marginBottom: '1rem' }}>
          {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY CODE'}
        </button>
        <button onClick={() => navigate('/lobby')} className="primary-button" style={{ width: '100%' }}>
          ENTER LOBBY
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
